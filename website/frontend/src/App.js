import './App.css';
import Animation from './Animation';
import Header from './components/Header';
import Footer from './components/Footer';
import GaussianDemo from './components/GaussianDemo';
import ExplosionDemo from './components/ExplosionDemo';
import ConvexHullDemo from './components/ConvexHullDemo'
import Incremental3DHull from './components/Incremental3DHull'

function App() {
  return (
    <div className="App">
      <Header />

      <main className="App-content">

        <section className="content-section">
          <h2>1. Introduction</h2>
          <p>

        Delaunay triangulations are a fundamental geometric structure widely used in
        computational geometry, computer graphics, mesh generation, and in many other
        applications. Much of their popularity stems from their optimal angular properties:
        the Delaunay triangulation of a point set maximizes the minimum angle among all
        possible triangulations. This property, first proven by Sibson, helps in the
        process of creating triangulations with triangles that are “well-shaped” which is a
        highly desirable property in many applications. Notice, however, that even in
        Delaunay triangulations, poorly shaped triangles can still occur based on the point
        set utilized to build the triangulation. To address this problem, refinement
        techniques such as the insertion of additional points have been developed to
        improve the quality of the poorly shaped triangles.
        Refinement through point insertion is a technique utilized for improving the
        quality of Delaunay triangulations. By adding points in certain locations, it is
        possible to improve the angle distribution, and achieve a more uniform
        triangulation. This process, known as Delaunay Refinement, has been well-studied
        for order-1 Delaunay triangulations. However, the role of refinement in
        higher-order Delaunay triangulations remains largely unexplored. We aim to
        explore the angle optimization properties of order-2 Delaunay Delaunay
        triangulations and the role of refinement in achieving these properties.
          </p>
          <div className="animation-container">
  <h2 className="text-2xl font-bold text-secondary-color mb-6">Order-k Delaunay Triangulations Visualizations using Rhomboid Tiling</h2>

  <div className="grid md:grid-cols-2 gap-6">
    <div className="bg-card-background rounded-lg p-4 shadow-md">
      <img
        src="/Delaunay1.png"
        alt="Delaunay Triangulation Examples"
        className="w-full rounded-lg"
      />
      <p className="text-gray-300 text-sm mt-2 text-center">Order-2 Delaunay triangulation with its correspodning angle histogram. Notice the really skinny triangle</p>
    </div>

    <div className="bg-card-background rounded-lg p-4 shadow-md">
      <img
        src="/Delaunay2.png"
        alt="Triangle Angle Distribution"
        className="w-full rounded-lg"
      />
      <p className="text-gray-300 text-sm mt-2 text-center">Histogram of triangle angles in a Delaunay mosaic</p>
    </div>
  </div>
</div>

        </section>

        <section className="content-section">
          <h2>2. Problem Definition</h2>
          <div className="problem-container">
            <p><strong>Main Problem:</strong> How can refinement optimize angles in order-2 Delaunay triangulations?</p>
            <p><strong>Sub-Problems:</strong></p>
            <ul className="sub-problems-list">
              <li>Refinement for general order-k Delaunay triangulations</li>
              <li>Incremental algorithm for order-2 Delaunay triangulations</li>
              <li>Incremental algorithm for order-k Delaunay triangulations</li>
              <li>Randomized incremental algorithm for order-2 Voronoi Diagrams</li>
              <li>Study size complexity of order-k triangulations</li>
            </ul>
          </div>
        </section>

        <section className="content-section">
          <h2>3. Literature Review</h2>
          <p>
            The following are a subset of papers we utilized for our study of refinement and Delaunay triangulations.
          </p>
          <ol className="literature-list">
            <li>
              <strong>A Simple Algorithm for Higher-Order Delaunay Mosaics and Alpha Shapes:</strong>
              <p>Introduces a combinatorial algorithm using rhomboid tiling and weighted Delaunay triangulations.</p>
            </li>
            <li>
              <strong>Order-2 Delaunay Triangulations Optimize Angles:</strong>
              <p>Extends optimal angle properties to order-2 triangulations.</p>
            </li>
            <li>
              <strong>A New Duality Result Concerning Voronoi Diagrams:</strong>
              <p>Establishes a duality between order-k Voronoi diagrams and convex hulls.</p>
            </li>
            <li>
              <strong>A Review on Delaunay Refinement Techniques:</strong>
              <p>Surveys refinement methods potentially applicable to higher-order cases.</p>
            </li>
          </ol>
        </section>



        <section className="content-section">
          <h2>5. Experimental Study Plan</h2>
          <h3>5.1. Motivation for Experimental Study</h3>
          <p>
            We aim to investigate how point insertion and smoothing improves the angle distribution
            in order-2 Delaunay triangulations.
          </p>

          <h3>5.2. Experimental Setup</h3>
          <div className="study-plan">
            <h4>Data Acquisition</h4>
            <p>
              The first step of the experiment is to generate point sets to experiment on.
              Below are the tentative ideas for experimentation. Each experiment will be run
              with multiple randomly generated point sets of each type:
            </p>
            <ul>
              <li>
                <strong>'Explosion' point sets:</strong> Points get worse the farther they are from the center.
                <ExplosionDemo />
              </li>
              <li>
                <strong>Convex point sets:</strong> Points are randomly generated inside of a circle, ensuring convexity.
                <ConvexHullDemo />

              </li>
              <li>
                <strong>Gaussian Distribution (uniform) point sets:</strong> Points are sampled from a Gaussian distribution.
                <GaussianDemo />
              </li>

            </ul>

            <h4>Initial Evaluation</h4>
            <p>
              We will evaluate the triangulation of each pointset utilizing an angle histogram
              to easily determine the minimum and maximum angles, and more importantly, the overall
              distribution. Another metric that identifies skinny triangles is the radius-edge ratio
              of a triangle circumcircle and its' edges (equivalent to angle measures).
            </p>

            <h4>Angle Refinement Experimentation</h4>
            <ul>
              <li>
                <strong>Point Set Insertion:</strong> First, identify the triangles with poor angles
                (less than 30 degrees). After identifying these points, we can take the circumcenter
                of the triangle, and insert that point into the point set. However, we would like to
                test whether this affects the second order Delaunay triangulation as well.
              </li>

              <li>
                <strong>Evaluation:</strong> We will evaluate the effect of smoothing and insertion in
                the first order Delaunay triangulation on the second order Delaunay triangulation.
              </li>
            </ul>

            <h4>Final Evaluations</h4>
            <p>
              To determine whether the angle refinement was successful, we will compare the angle
              histograms of the 2nd order Delaunay triangulations before and after refinement.
            </p>
          </div>
        </section>

        <section className="content-section">
          <h2>6. Preliminary Results and Observations</h2>
          <p>
            Convex and Gaussian point sets show poor angles, making them strong candidates for refinement.
            Main challenge: non-incremental nature of rhomboid tiling algorithms.
          </p>
        </section>




        <div className="animation-container">
          <h2>Animation</h2>
          <Animation />
        </div>

 <div className="animation-container">
  <h2 className="text-3xl font-bold text-secondary-color mb-8 border-b border-secondary-color pb-2">
    Incremental Algorithm
  </h2>

  <div className="bg-card-background p-8 rounded-xl shadow-lg text-gray-300 text-lg leading-relaxed space-y-6">

    <p className="text-gray-200">
      We compute the <span className="text-secondary-color font-semibold">order‑2 Delaunay triangulation</span> by lifting every pair of points
      into 3D, computing their barycenters on the paraboloid, and then projecting
      the downward‑facing (lower) hull back to 2D.
    </p>

    <div className="bg-gray-700 rounded-md p-4 border-l-4 border-secondary-color">
      <p className="text-gray-100">
        <strong>Note:</strong> The current implementation uses <span className="text-secondary-color font-semibold">Qhull</span> to rebuild the entire hull
        on each insertion. To make it <em>truly incremental</em>, we need to:
      </p>
    </div>

    <ol className="list-decimal list-inside space-y-4 pl-4 text-base">
      <li className="font-semibold">
        Construct the initial tetrahedron using the first four points.
      </li>
      <li className="font-semibold">
        When a new point arrives, find and remove all hull faces visible from it.
      </li>
      <li className="font-semibold">
        Fix the hole in the convex hull by connecting each edge to the inserted point.
      </li>
      <li className="font-semibold">
        From those new faces, keep only the ones whose normals face downward (lower hull).
      </li>
    </ol>
  </div>

  <div className="mt-8">
    <Incremental3DHull />
  </div>
</div>



      </main>

      <Footer />
    </div>
  );
}

export default App;