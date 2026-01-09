export class Process {
  constructor(id, arrivalTime, burstTime, priority = 1, color) {
    this.id = id;
    this.arrivalTime = arrivalTime;
    this.burstTime = burstTime;
    this.priority = priority; // Lower number = Higher priority
    this.color = color;
    this.remainingTime = burstTime;
    this.startTime = -1;
    this.completionTime = -1;
    this.waitingTime = 0;
    this.turnaroundTime = 0;
  }
}

export class Scheduler {
  constructor() {
    this.processes = [];
    this.timeLog = [];
  }

  addProcess(process) {
    this.processes.push(process);
  }

  reset() {
    this.timeLog = [];
    this.processes.forEach(p => {
      p.remainingTime = p.burstTime;
      p.startTime = -1;
      p.completionTime = -1;
      p.waitingTime = 0;
      p.turnaroundTime = 0;
    });
  }

  metrics(completed) {
     const totalWait = completed.reduce((acc, p) => acc + p.waitingTime, 0);
    const totalTurnaround = completed.reduce((acc, p) => acc + p.turnaroundTime, 0);
    return {
      avgWait: completed.length ? (totalWait / completed.length).toFixed(2) : 0,
      avgTurnaround: completed.length ? (totalTurnaround / completed.length).toFixed(2) : 0
    };
  }

  runFCFS() {
    this.reset();
    let sorted = [...this.processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    let currentTime = 0;
    let completed = [];

    sorted.forEach(p => {
      if (currentTime < p.arrivalTime) {
        this.timeLog.push({ start: currentTime, end: p.arrivalTime, processId: 'IDLE', color: '#333' });
        currentTime = p.arrivalTime;
      }
      p.startTime = currentTime;
      this.timeLog.push({ start: currentTime, end: currentTime + p.burstTime, processId: p.id, color: p.color });
      currentTime += p.burstTime;
      p.completionTime = currentTime;
      p.turnaroundTime = p.completionTime - p.arrivalTime;
      p.waitingTime = p.turnaroundTime - p.burstTime;
      completed.push(p);
    });

    return { log: this.timeLog, metrics: this.metrics(completed) };
  }

  runSJF() {
    this.reset();
    let pending = [...this.processes];
    let currentTime = 0;
    let completed = [];
    
    while (pending.length > 0) {
      // Get all processes that have arrived by now
      let available = pending.filter(p => p.arrivalTime <= currentTime);
      
      if (available.length === 0) {
        // Find next arrival
        let nextProcess = pending.reduce((min, p) => p.arrivalTime < min.arrivalTime ? p : min, pending[0]);
        this.timeLog.push({ start: currentTime, end: nextProcess.arrivalTime, processId: 'IDLE', color: '#333' });
        currentTime = nextProcess.arrivalTime;
        continue;
      }

      // Sort by Burst Time (SJF)
      available.sort((a, b) => a.burstTime - b.burstTime);
      let p = available[0];

      p.startTime = currentTime;
      this.timeLog.push({ start: currentTime, end: currentTime + p.burstTime, processId: p.id, color: p.color });
      currentTime += p.burstTime;
      p.completionTime = currentTime;
      p.turnaroundTime = p.completionTime - p.arrivalTime;
      p.waitingTime = p.turnaroundTime - p.burstTime;
      
      completed.push(p);
      pending = pending.filter(x => x.id !== p.id);
    }
    return { log: this.timeLog, metrics: this.metrics(completed) };
  }

  runPriority() {
    this.reset();
    let pending = [...this.processes];
    let currentTime = 0;
    let completed = [];
    
    while (pending.length > 0) {
      let available = pending.filter(p => p.arrivalTime <= currentTime);
      
      if (available.length === 0) {
        let nextProcess = pending.reduce((min, p) => p.arrivalTime < min.arrivalTime ? p : min, pending[0]);
        this.timeLog.push({ start: currentTime, end: nextProcess.arrivalTime, processId: 'IDLE', color: '#333' });
        currentTime = nextProcess.arrivalTime;
        continue;
      }

      // Sort by Priority (Lower number = Higher Priority)
      available.sort((a, b) => a.priority - b.priority);
      let p = available[0];

      p.startTime = currentTime;
      this.timeLog.push({ start: currentTime, end: currentTime + p.burstTime, processId: p.id, color: p.color });
      currentTime += p.burstTime;
      p.completionTime = currentTime;
      p.turnaroundTime = p.completionTime - p.arrivalTime;
      p.waitingTime = p.turnaroundTime - p.burstTime;
      
      completed.push(p);
      pending = pending.filter(x => x.id !== p.id);
    }
    return { log: this.timeLog, metrics: this.metrics(completed) };
  }

  runRoundRobin(quantum = 2) {
    this.reset();
    let processes = this.processes.map(p => ({...p})); // Clone state for simulation
    processes.sort((a,b) => a.arrivalTime - b.arrivalTime); // Initial arrival sort
    
    let currentTime = 0;
    let completed = [];
    let queue = [];
    
    // Add initial processes to queue
    let i = 0;
    while(i < processes.length && processes[i].arrivalTime <= currentTime) {
      queue.push(processes[i]);
      i++;
    }

    while (queue.length > 0 || i < processes.length) {
      if (queue.length === 0) {
        // Skip to next arrival
        let nextP = processes[i];
        this.timeLog.push({ start: currentTime, end: nextP.arrivalTime, processId: 'IDLE', color: '#333' });
        currentTime = nextP.arrivalTime;
        while(i < processes.length && processes[i].arrivalTime <= currentTime) {
          queue.push(processes[i]);
          i++;
        }
      }

      let p = queue.shift();
      let execTime = Math.min(p.remainingTime, quantum);
      
      this.timeLog.push({
        start: currentTime,
        end: currentTime + execTime,
        processId: p.id,
        color: p.color
      });

      currentTime += execTime;
      p.remainingTime -= execTime;

      // Add newly arrived processes
      while(i < processes.length && processes[i].arrivalTime <= currentTime) {
        queue.push(processes[i]);
        i++;
      }

      if (p.remainingTime > 0) {
        queue.push(p);
      } else {
        // Process done
        p.completionTime = currentTime;
        p.turnaroundTime = p.completionTime - p.arrivalTime;
        p.waitingTime = p.turnaroundTime - p.burstTime;
        completed.push(p);
      }
    }
    return { log: this.timeLog, metrics: this.metrics(completed) };
  }
}
