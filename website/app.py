from flask import Flask, render_template, url_for
from pathlib import Path

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent

@app.route('/')
def index():
    """Renders the homepage."""
    greeting = "Investigating Angle Optimality in Higher-Order Voronoi Diagrams and Refinement Techniques"
    return render_template('index.html', message=greeting)

if __name__ == '__main__':
    # debug=True enables auto-reload and provides a debugger -- NEVER run with debug=True in a production environment!
    app.run(debug=True, port=5001)