export const quizData = {
    scheduling: [
        {
            id: 1,
            question: "In the 'Shortest Job First' (SJF) algorithm, what happens if a long process arrives before several short processes?",
            options: [
                "The short processes jump ahead immediately.",
                "The long process runs to completion, delaying the short ones.",
                "The CPU splits time equally between them.",
                "The long process is cancelled."
            ],
            correctAnswer: "The long process runs to completion, delaying the short ones.",
            explanation: "SJF is non-preemptive by default. Once the CPU is assigned to the long process (because it arrived first when the queue was empty), it cannot be stopped, causing 'Convoy Effect' where short jobs wait."
        },
        {
            id: 2,
            question: "Which scheduling algorithm is best for interactive systems where responsiveness is key?",
            options: [
                "First Come First Serve (FCFS)",
                "Round Robin (RR)",
                "Shortest Job First (SJF)",
                "Priority Scheduling"
            ],
            correctAnswer: "Round Robin (RR)",
            explanation: "Round Robin assigns a fixed time slice (Quantum) to each process, ensuring no process waits too long. This rapid switching creates the illusion of responsiveness."
        },
        {
            id: 3,
            question: "What is 'Starvation' in Priority Scheduling?",
            options: [
                "When a process has no memory.",
                "When low-priority processes never execute because high-priority ones keep arriving.",
                "When the CPU overheats.",
                "When a process finishes too quickly."
            ],
            correctAnswer: "When low-priority processes never execute because high-priority ones keep arriving.",
            explanation: "If high-priority processes constantly enter the queue, the low-priority process at the back may theoretically wait forever."
        }
    ],
    synchronization: [
        {
            id: 1,
            question: "What is a 'Race Condition'?",
            options: [
                "Two threads running at maximum speed.",
                "A competition to see which thread finishes first.",
                "When system behavior depends on the unpredictable timing of thread execution.",
                "When the CPU clockspeed fluctuates."
            ],
            correctAnswer: "When system behavior depends on the unpredictable timing of thread execution.",
            explanation: "A race condition occurs when multiple threads access shared data concurrently without synchronization, and the final result depends on who ran when."
        },
        {
            id: 2,
            question: "What is the primary purpose of a Mutex (Lock)?",
            options: [
                "To speed up the CPU.",
                "To ensure Mutual Exclusion in a Critical Section.",
                "To delete shared variables.",
                "To stop all threads permanently."
            ],
            correctAnswer: "To ensure Mutual Exclusion in a Critical Section.",
            explanation: "A Mutex ensures that only one thread can access the critical section (shared resource) at a time, preventing data corruption."
        },
        {
            id: 3,
            question: "If Thread A holds a lock and Thread B tries to acquire it, what happens to Thread B?",
            options: [
                "Thread B steals the lock.",
                "Thread B crashes.",
                "Thread B blocks (waits) until Thread A releases the lock.",
                "Thread B skips the critical section."
            ],
            correctAnswer: "Thread B blocks (waits) until Thread A releases the lock.",
            explanation: "Thread B enters a waiting state. It cannot proceed into the critical section until the lock is available."
        }
    ],
    producer_consumer: [
        {
            id: 1,
            question: "Why do we need TWO semaphores (EmptySlots & FullSlots) for the Bounded Buffer problem?",
            options: [
                "One is for backup.",
                "To track both available space for Producers and available items for Consumers.",
                "It is just a convention, one is enough.",
                "To separate the memory."
            ],
            correctAnswer: "To track both available space for Producers and available items for Consumers.",
            explanation: "The Producer needs to know if there's space (EmptySlots), and the Consumer needs to know if there's data (FullSlots). They track opposite states."
        },
        {
            id: 2,
            question: "What happens if the Producer is faster than the Consumer and there is no synchronization?",
            options: [
                "Buffer Overflow (Data Loss).",
                "Buffer Underflow.",
                "The Consumer gets faster automatically.",
                "The system freezes."
            ],
            correctAnswer: "Buffer Overflow (Data Loss).",
            explanation: "Without a check for available space, the Producer will keep overwriting slots in the full buffer, causing data loss."
        },
        {
            id: 3,
            question: "When does the Consumer thread block (sleep)?",
            options: [
                "When the buffer is Full.",
                "When the buffer is Empty.",
                "When the Producer is sleeping.",
                "Every 5 seconds."
            ],
            correctAnswer: "When the buffer is Empty.",
            explanation: "The Consumer cannot consume if there are no items. It waits on the `FullSlots` semaphore (which is 0 when empty)."
        }
    ],
    dining_philosophers: [
        {
            id: 1,
            question: "What causes 'Deadlock' in the Dining Philosophers problem?",
            options: [
                "The food is too hot.",
                "A circular dependency where every philosopher holds one fork and waits for the next.",
                "Philosophers eating too fast.",
                "Not enough chairs."
            ],
            correctAnswer: "A circular dependency where every philosopher holds one fork and waits for the next.",
            explanation: "Deadlock happens when everyone is holding a resource (Left Fork) needed by their neighbor, so no one can proceed."
        },
        {
            id: 2,
            question: "How can we prevent Deadlock in this scenario?",
            options: [
                "Add more forks.",
                "Make philosophers eat faster.",
                "Break the circular dependency (e.g., Odd/Even strategy).",
                "Remove the table."
            ],
            correctAnswer: "Break the circular dependency (e.g., Odd/Even strategy).",
            explanation: "By enforcing a rule (Resource Hierarchy) where some pick up left first and others right first, we prevent the cycle of dependency."
        },
        {
            id: 3,
            question: "What is 'Starvation' in this context?",
            options: [
                "Running out of food.",
                "When a philosopher waits indefinitely because neighbors keep eating.",
                "When a thread crashes.",
                "When the simulation stops."
            ],
            correctAnswer: "When a philosopher waits indefinitely because neighbors keep eating.",
            explanation: "Even without deadlock, a philosopher might never get both forks if their neighbors are greedy and alternate perfectly."
        }
    ]
};
