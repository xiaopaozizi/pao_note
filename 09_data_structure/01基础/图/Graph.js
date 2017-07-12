// 表示顶点
function Vertex (label) {
	this.label = label;		// 顶点
}
// 构建图
function Graph(v) {
	this.vertices = v;		// 顶点的个数
	this.edges = 0;			// 边的个数
	this.adj = [];			// 数量与顶点数量相等的来保存相邻顶点的数组
	this.edgeTo = [];
	this.marked = [];		// 用来储蓄已经访问过的顶点，默认全部为false
	for ( var i = 0; i < this.vertices; i++ ) {
		this.adj[i] = [];
		// this.adj[i].push('');
		this.marked[i] = false;
	} 
	this.addEdge = addEdge;
	this.showGraph = showGraph;
	this.dfs = dfs;
	this.bfs = bfs;
	this.pathTo = pathTo;
	this.hasPathTo = hasPathTo;
	this.topSort = topSort;
	this.topSortHelper = topSortHelper;
}
// 添加边
// 传入两个顶点 v和w
// 相邻表：就是保存与当前顶点有相邻关系的顶点的集合
function addEdge(v, w) {
	this.adj[v].push(w);	// 将 顶点 w 添加到 顶点 v 的相邻表中
	this.adj[w].push(v);	// 将 顶点 v 添加到 顶点 w 的相邻表中
	this.edges++;
}
// 深度优先算法：访问一个没有访问过的顶点，将其标记为已经访问过了
// 然后在递归去访问原始顶点的相邻表中的顶点集合中的每个顶点
function dfs(v) {
	var subVertex;
	this.marked[v] = true;		// 当前顶点已经访问
	if (this.adj[v] != undefined) {		
		console.log('访问顶点：' + v);	
		for(var w in this.adj[v]) { // 遍历 顶点v 的相邻表中的顶点 
			subVertex = this.adj[v][w];
			if (!this.marked[subVertex]) {	// 如果该顶点没有被访问，则递归访问
				this.dfs(subVertex);
			}
		}
	}
}
// 广度优先：将原始节点的相邻表中的未访问的节点放入队列中，
// 然后在队列中取出队首的节点，之后再重复前面的方法
function bfs(s) {
	var queue = [];
	var subVertex;
	this.marked[s] = true;
	queue.push(s);
	while(queue.length > 0) {
		var v = queue.shift();
		if (v != undefined) {
			console.log('访问顶点：' + v);
		}
		for (var w in this.adj[v]) {
			// console.log(this.adj[v][w]);
			subVertex = this.adj[v][w];
			if (!this.marked[subVertex]){
				this.edgeTo[subVertex] = v;
				this.marked[subVertex] = true;
				queue.push(subVertex);
			}
		}
	}
}
// 最短路径
function pathTo(v) {
	var source = 0;
	var path = [];
	if (!this.hasPathTo(v)) {
		return undefined;
	}
	for ( var i = v; i != source; i = this.edgeTo[i] ) {
		path.push(i);
	}
	path.push(source);
	var str = '';
	while(path.length > 0) {
		if (path.length > 1) {
			str += path.pop() + ' - ';
		} else {
			str += path.pop();
		}
	}
	return str;
}
// 是否还有路径
function hasPathTo(v) {
	return this.marked[v];
}
// 拓扑排序
function topSort() {
	var stack = [];
	var visited = [];
	for ( var i = 0; i < this.vertices; i++ ) {
		visited[i] = false;
	}
	for ( var i = 0; i < this.vertices; i++ ) {
		if ( visited[i] == false ) {
			this.topSortHelper(i, visited, stack);
		}
	}
	for ( var i = 0; i < stack.length; i++ ) {
		if (stack[i] !== undefined && stack[i] !== false) {
			console.log(this.vertexList[stack[i]]);
		}
	}
	
}
function topSortHelper(v, visited, stack) {
	visited[v] = true;
	for (var w in this.adj[v]) {
		if ( !visited[this.adj[v][w]]) {
			this.topSortHelper(visited[this.adj[v][w]], visited, stack);
		}
	}
	stack.push(v);
}
// 显示图
function showGraph() {
	var str = '';
	for ( var i = 0; i < this.vertices; i++ ) {
		str = i + ' -> ';
		for ( var j = 0; j < this.vertices; j++ ) {
			if (this.adj[i][j] != undefined) {
				str += this.adj[i][j] + ' ';
			}
		}
		console.log(str);
	}
}