# convex-collective

To run some examples first you need a set of points. Either create your own, for example:

# points = np.array([[156.006,705.854], [215.257,732.63], [283.108,707.272], [244.042,670.948], [366.035,687.396], [331.768,625.715], [337.936,559.92], [249.525,582.537], [187.638,556.13], [165.912,631.197]])

or use one of the sampling functions. The only one available now is generate_2d_gaussian_points. 

    points = generate_2d_gaussian_points(14)

After you have your points you need vertices, triangles and angles, you can obtain them with the following code":

    orderk_delaunay = OrderKDelaunay(points, order)
    diagrams_vertices = orderk_delaunay.diagrams_vertices[1]
    diagrams_simplices = orderk_delaunay.diagrams_simplices[1]
    diagram_angles = compute_triangle_angles(points,diagrams_vertices, diagrams_simplices)

The first 3 lines is code from the rhomboid tiling algorithm. This code simply gives you vertices and triangles.
To get the angles you run the third line which takes as input points, vertices and triangles to obtain the angles.

To plot the histogram run:

    plot_angle_histogram(diagram_angles)

This function receives the angles.
