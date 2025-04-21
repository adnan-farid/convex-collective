# app.py  (in your backend)

from flask import Flask, render_template, request, send_file, jsonify
from pathlib import Path
from rhomboidtiling_convex_collective.refinementlib.refinement import (
    refine_with_k_steiner_points,
    make_refinement_gif
)
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



@app.route('/')
def index():
    return render_template('index.html', 
                           message="Investigating Angle Optimality in Higher-Order Voronoi Diagrams and Refinement Techniques")

@app.route('/api/animate', methods=['POST'])
def animate():
    try:
        params = request.get_json(force=True)
        points = params.get('points')
        min_angle = float(params.get('min_angle', 20.0))
        k = int(params.get('k', 5))
    except Exception:
        return jsonify(error="Invalid request: need 'points', 'min_angle', and 'k'"), 400

    if (
        not isinstance(points, list) or
        len(points) < 3 or
        any(not isinstance(p, (list, tuple)) or len(p) != 2 for p in points)
    ):
        return jsonify(error="'points' must be an array of at least 4 [x,y] pairs"), 400

    try:
        steps = refine_with_k_steiner_points(points, k=k, min_angle=min_angle)
        gif_buf = make_refinement_gif(steps, points, min_angle, fps=2)
        return send_file(gif_buf, mimetype='image/gif')
    except Exception as e:
        app.logger.exception("Error in /api/animate")
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
