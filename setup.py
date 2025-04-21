from setuptools import setup, find_packages

setup(
    name="refinementlib",
    version="0.1.0",
    packages=find_packages(),      # this will find rhomboidtiling_convex_collective and its subpackages
    install_requires=[
        "numpy", "matplotlib", "triangle", "scipy", "flask", "flask-cors", "pillow", "IPython"
    ],
)
