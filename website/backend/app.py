# app.py  (in your backend)

from flask import Flask, render_template, request, send_file, jsonify
from pathlib import Path
from rhomboidtiling_convex_collective.refinementlib.refinement import (
    refine_with_k_steiner_points,
    get_refinement_frames
)
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html', 
                           message="Investigating Angle Optimality in Higher-Order Voronoi Diagrams and Refinement Techniques")

@app.route('/api/animate', methods=['POST'])
def frames():
    data = request.get_json(force=True)
    points = data.get('points', [])
    min_angle = float(data.get('min_angle', 20))
    k = int(data.get('k', 5))

    if not isinstance(points, list) or len(points) < 3:
        return jsonify(error="'points' must be ≥3 [x,y] pairs"), 400

    meshes = refine_with_k_steiner_points(points, k=k, min_angle=min_angle)
    png_frames = get_refinement_frames(meshes, points, min_angle)
    return jsonify(frames=png_frames)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
