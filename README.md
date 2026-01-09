# OS Interactive Learning Platform

**Master Operating Systems Without The Boredom.**  
An interactive, visual, and gamified web platform designed to help students understand core Operating Systems concepts through simulations and real-time visualization.

![OS Platform Hero](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80)

## 🚀 Key Features

### 1. CPU Scheduling Arena
*   **Visualize Algorithms**: Watch processes get executed in real-time.
*   **Supported Algorithms**: FCFS, SJF (Preemptive/Non-preemptive), Round Robin, Priority Scheduling.
*   **Metrics**: View Gantt Charts and calculate Average Waiting/Turnaround Times instantly.

### 2. Synchronization Studio (Bank Simulation)
*   **Race Conditions**: See what happens when two threads access a shared bank balance simultaneously.
*   **Mutex Locks**: Enable locks to solve the race condition and understand "Atomic Operations".
*   **Visual Metaphor**: "Threads" appearing as users at an ATM.

### 3. Producer-Consumer Factory
*   **Bounded Buffer**: Visualize a factory conveyor belt (Buffer) with limited space.
*   **Semaphores**: Toggle semaphores to prevent Buffer Overflow (adding to full) and Underflow (taking from empty).
*   **Interactive Controls**: Manually add or consume items to test edge cases.

### 4. Dining Philosophers (Deadlock)
*   **Circular Visualization**: 5 Philosophers sitting at a table with 5 shared forks.
*   **Deadlock Mode**: Watch the system freeze when everyone picks the left fork simultaneously.
*   **Neighbors Fight**: Simulate "Mutual Exclusion" where two neighbors try to eat at the exact same time.
*   **Solution Mode**: Enable "Resource Ordering" to prevent deadlock and ensure everyone eats.

### 5. Assessment & Feedback
*   **Interactive Quizzes**: Test your knowledge at the end of each module.
*   **Instant Feedback**: Get scores and explanations for every question.
*   **Student Feedback**: Submit reviews or suggestions directly within the app.

---

## 🛠️ Technology Stack
*   **Frontend**: React (Vite)
*   **Styling**: Vanilla CSS (Glassmorphism & Dark Theme)
*   **Animations**: Framer Motion
*   **Icons**: Lucide React
*   **Charts**: Recharts

---

## 📦 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/os-interactive-learning.git
    cd os-interactive-learning
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run Locally**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173/` (or the port shown in your terminal) to view the app.

---

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, Quiz, Feedback)
├── features/         # Logic & Visuals for specific OS modules
│   ├── scheduling/       # Gantt Chart, Process Logic
│   ├── synchronization/  # ATM Visual, Bank Logic
│   ├── dining/           # Philosopher, Fork components
│   └── producer/         # Factory, Conveyor Belt
├── pages/            # Main Page Views (Home, About, Module Pages)
├── data/             # Quiz Question Database
└── App.jsx           # Main Routing & Global Layout
```

---

## 🤝 Contributing
Contributions are welcome! If you have ideas for new simulations (e.g., Paging, Disk Scheduling), feel free to open an issue or pull request.

## 📝 License
This project is open-source and available under the MIT License.
