export class BankSimulation {
    constructor(initialBalance = 1000) {
        this.initialBalance = initialBalance;
    }

    // Generates a sequence of steps for a Race Condition
    // Interleaves Read/Write operations to cause lost update
    getRaceConditionSteps(amount) {
        const steps = [];
        const readBalance = this.initialBalance;
        const finalBalance = readBalance - amount;

        // Step 1: Thread A Reads
        steps.push({
            actor: 'A',
            action: 'READ',
            desc: 'Thread 1 reads shared variable',
            localVal: readBalance,
            sharedVal: readBalance
        });

        // Step 2: Thread B Reads (Critical! Reads same obsolete value)
        steps.push({
            actor: 'B',
            action: 'READ',
            desc: 'Thread 2 reads shared variable (Race Condition!)',
            localVal: readBalance,
            sharedVal: readBalance
        });

        // Step 3: Thread A Calculates & Writes
        steps.push({
            actor: 'A',
            action: 'WRITE',
            desc: `Thread 1 decrements variable by ${amount}`,
            localVal: finalBalance,
            sharedVal: finalBalance // Val becomes 900
        });

        // Step 4: Thread B Calculates & Writes (Overwrites A!)
        steps.push({
            actor: 'B',
            action: 'WRITE',
            desc: `Thread 2 decrements variable (Overwrites Thread 1!)`,
            localVal: finalBalance,
            sharedVal: finalBalance // Val stays 900 instead of 800
        });

        return steps;
    }

    // Generates a sequence of steps with Mutex
    // Thread A completes fully before Thread B starts
    getMutexSteps(amount) {
        const steps = [];
        let currentBalance = this.initialBalance;

        // --- Thread A Critical Section ---
        steps.push({ actor: 'A', action: 'LOCK', desc: 'Thread 1 acquires Lock', localVal: null, sharedVal: currentBalance });

        steps.push({
            actor: 'A',
            action: 'READ',
            desc: 'Thread 1 reads variable',
            localVal: currentBalance,
            sharedVal: currentBalance
        });

        currentBalance -= amount;

        steps.push({
            actor: 'A',
            action: 'WRITE',
            desc: `Thread 1 decrements variable`,
            localVal: currentBalance,
            sharedVal: currentBalance
        });

        steps.push({ actor: 'A', action: 'UNLOCK', desc: 'Thread 1 releases Lock', localVal: null, sharedVal: currentBalance });


        // --- Thread B Critical Section ---
        steps.push({ actor: 'B', action: 'LOCK', desc: 'Thread 2 acquires Lock', localVal: null, sharedVal: currentBalance });

        steps.push({
            actor: 'B',
            action: 'READ',
            desc: 'Thread 2 reads variable',
            localVal: currentBalance,
            sharedVal: currentBalance
        });

        currentBalance -= amount;

        steps.push({
            actor: 'B',
            action: 'WRITE',
            desc: `Thread 2 decrements variable`,
            localVal: currentBalance,
            sharedVal: currentBalance
        });

        steps.push({ actor: 'B', action: 'UNLOCK', desc: 'Thread 2 releases Lock', localVal: null, sharedVal: currentBalance });

        return steps;
    }
}
