//Quick intro to anyone not familiar with Dijkstra's algorithm
//It is a Single Source Shortest Path(SSSP) algorithm and kind of like the father of Pathfinding algorithms
//It can be used to find the shortest path in a graph with nodes and edges
//I will be using an adjacency matrix to represent the graph



	
let V = 9; //Initializing the number of Vertices in the graph

// A utility function to find the
// vertex with minimum distance
// value, from the set of vertices
// not yet included in shortest
// path tree
function minDistance(dist,shortest_path)
{
	
	// Initialize min value
	let min = Number.MAX_VALUE; //MAX_VALUE property in JS can be used to inialize a certain variable to infinity 
                                // which is precisely what we want for Dijkstra's algorithm, MAX_VALUE is basically the largest value possible in JS
	let min_index = -1;
	
	for(let v = 0; v < V; v++)
	{
		if (shortest_path[v] == false && dist[v] <= min)
		{
			min = dist[v];
			min_index = v;
		}
	}
	return min_index;
}

// A utility function to print
// the constructed distance array
function printSolution(dist)
{
	document.write("Vertex \t\t Distance from Source<br>");
	for(let i = 0; i < V; i++)
	{
		document.write(i + " \t\t " +
				dist[i] + "<br>");
	}
}

// Funtion that implements Dijkstra's
// single source shortest path algorithm
// for a graph represented using adjacency
// matrix representation
function dijkstra(graph, src)
{
	let dist = new Array(V);
	let shortest_path = new Array(V);
	
	// Initialize all distances as
	// INFINITE and stpSet[] as false
	for(let i = 0; i < V; i++)
	{
		dist[i] = Number.MAX_VALUE;
		shortest_path[i] = false;
	}
	
	// Distance of source vertex
	// from itself is always 0
	dist[src] = 0;
	
	// Find shortest path for all vertices
	for(let count = 0; count < V - 1; count++)
	{
		
		// Pick the minimum distance vertex
		// from the set of vertices not yet
		// processed. u is always equal to
		// src in first iteration.
		let u = minDistance(dist, shortest_path);
		
		// Mark the picked vertex as processed
		shortest_path[u] = true;
		
		// Update dist value of the adjacent
		// vertices of the picked vertex.
		for(let v = 0; v < V; v++)
		{
			
			// Update dist[v] only if is not in
			// sptSet, there is an edge from u
			// to v, and total weight of path
			// from src to v through u is smaller
			// than current value of dist[v]
			if (!shortest_path[v] && graph[u][v] != 0 &&
				dist[u] != Number.MAX_VALUE &&
				dist[u] + graph[u][v] < dist[v])
			{
				dist[v] = dist[u] + graph[u][v];
			}
		}
	}
	
	// Print the constructed distance array
	printSolution(dist);
}

// Driver code
let graph = [ [ 0, 4, 0, 0, 0, 0, 0, 8, 0 ],
			[ 4, 0, 8, 0, 0, 0, 0, 11, 0 ],
			[ 0, 8, 0, 7, 0, 4, 0, 0, 2 ],
			[ 0, 0, 7, 0, 9, 14, 0, 0, 0],
			[ 0, 0, 0, 9, 0, 10, 0, 0, 0 ],
			[ 0, 0, 4, 14, 10, 0, 2, 0, 0],
			[ 0, 0, 0, 0, 0, 2, 0, 1, 6 ],
			[ 8, 11, 0, 0, 0, 0, 1, 0, 7 ],
			[ 0, 0, 2, 0, 0, 0, 6, 7, 0 ] ]
dijkstra(graph, 0);




