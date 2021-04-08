# For anyone not familiar with Dijstra's algorithm,
# it can be considered as the OG shortest path/path-finding
# algorithm, its a single source shortest path algorithm(SSSP)
# So it can be used to find the shortest path in graph, for this program
# an adjacency matrix will be used to represent the Graph
import sys


class Graph:
    # Constructor
    def __init__(
        self, vertices
    ):  # Self is a keyword in Python that is an instance of a class, with a dot operator it can be
        # used to access/manipulate elements of the class
        self.V = vertices
        self.grh = [[0 for column in range(vertices)] for row in range(vertices)]

    # Function to print the elements of the adjacency matrix
    def printsolution(self, dist):
        print("Vertex \tDistance from Source")
        for node in range(self.V):
            print(node, "\t", dist[node])

    # The following function is used to find the vertex with
    # minimum distance value, from the set of vertices
    # not yet included in shortest path tree
    # The shortest path tree is represented by the shortest_path_set array
    def mindistance(self, dist, shortest_path_Set):

        # Initilaize minimum distance for next node
        minimum = sys.maxsize

        # Search not nearest vertex not in the
        # shortest path tree
        for v in range(self.V):
            if dist[v] < minimum and shortest_path_Set[v] == False:
                minimum = dist[v]
                min_index = v

        return min_index

    # The following function implements Dijkstra's SSSP
    # algorithm for a graph which is represented
    # using an adjacency matrix, an adjacency matrix is the most easiest 
    def dijkstra(self, src):

        dist = [sys.maxsize] * self.V
        dist[src] = 0
        shortest_path_Set = [False] * self.V

        for cout in range(self.V):

            # Pick the minimum distance vertex from
            # the set of vertices not yet processed.
            # u is always equal to src in first iteration
            u = self.mindistance(dist, shortest_path_Set)

            # Put the minimum distance vertex in the
            # shotest path tree
            shortest_path_Set[u] = True

            # Update dist value of the adjacent vertices
            # of the picked vertex only if the current
            # distance is greater than new distance and
            # the vertex in not in the shotest path tree
            for v in range(self.V):
                if (
                    self.grh[u][v] > 0
                    and shortest_path_Set[v] == False
                    and dist[v] > dist[u] + self.grh[u][v]
                ):
                    dist[v] = dist[u] + self.grh[u][v]

        self.printsolution(dist)


# Driver program
g = Graph(9)
g.grh = [
    [0, 4, 0, 0, 0, 0, 0, 8, 0],
    [4, 0, 8, 0, 0, 0, 0, 11, 0],
    [0, 8, 0, 7, 0, 4, 0, 0, 2],
    [0, 0, 7, 0, 9, 14, 0, 0, 0],
    [0, 0, 0, 9, 0, 10, 0, 0, 0],
    [0, 0, 4, 14, 10, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 1, 6],
    [8, 11, 0, 0, 0, 0, 1, 0, 7],
    [0, 0, 2, 0, 0, 0, 6, 7, 0],
]

g.dijkstra(0)
