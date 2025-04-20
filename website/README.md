## Website Setup and Usage

This section details how to set up and run the Flask web application located in the `/website` directory.

### Prerequisites

* **Python:** Python version 3.12.3 is what I use, although other versions may work.

### Setup Instructions

1.  **Navigate to the Website Directory and Create a Python Virtual Environment:**
    ```bash
    cd website
    python -m venv .venv
    ```

2.  **Activate the Virtual Environment:**

    * **macOS / Linux (bash, zsh):**
        ```bash
        source .venv/bin/activate
        ```

    * **Windows (Command Prompt):**
        ```bash
        .venv\Scripts\activate.bat
        ```

    * **Windows (PowerShell):**
        ```powershell
        .venv\Scripts\Activate.ps1
        ```

    Your terminal prompt should now indicate that the `(.venv)` environment is active.

3.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
    Note: May add more requirements once logic for triangulations is implemented.

4.  **Set Flask Environment Variables:**
    These variables tell Flask how to run the application (pointing to `app.py` and enabling development mode for debugging and auto-reloading).

    * **macOS / Linux (bash, zsh):**
        ```bash
        export FLASK_APP=app.py
        export FLASK_ENV=development
        ```

    * **Windows (Command Prompt):**
        ```bash
        set FLASK_APP=app.py
        set FLASK_ENV=development
        ```

    * **Windows (PowerShell):**
        ```powershell
        $env:FLASK_APP = "app.py"
        $env:FLASK_ENV = "development"
        ```

5.  **Run the Flask Development Server:**
    ```bash
    flask run
    ```
    Go to `http://127.0.0.1:5000` to see the website