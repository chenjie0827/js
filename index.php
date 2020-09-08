<?php
?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<style></style>
	<script type="text/javascript" src="js/three.min.js"></script><!--3D的基础类-->
	<script type="text/javascript" src="js/OrbitControls.js"></script><!--摄像机控制类-->
	<script type="text/javascript" src="js/pos_sys.js"></script><!--坐标系角标类-->
</head>
<body>
	<!--画面-->
	<div id="3d_1" style="position:absolute; top:10px; left:10px; height:600px; width:800px; border:0px solid #000000;"></div>
	<!--画面2-->
	<div id="3d_2" style="position:absolute; top:10px; left:700px; height:100px; width:100px; border:0px solid #000000;"></div>
	<!--画面3-->
	<div id="3d_3" style="position:absolute; top:10px; left:820px; height:100px; width:100px; border:0px solid #000000;"></div>
</body>
</html>
<script type='text/javascript'>
	//*************************************************************
	//基础内容
	var scene = new THREE.Scene();//场景
	scene.background = new THREE.Color(0x808080);//背景色
	var camera = new THREE.PerspectiveCamera(45, 800/600, 0.1, 1000);//摄像机
	var renderer = new THREE.WebGLRenderer();//渲染器
	renderer.setSize(800, 600);//渲染器大小
	var canvas = renderer.domElement;//canvas对象
	document.getElementById("3d_1").appendChild(canvas);//添加到页面
	var light = new THREE.AmbientLight(0xffffff,0.75);//全局光，光源颜色
	scene.add(light);//添加到场景
	var gridline = new THREE.GridHelper(10, 20, 0xCD3700, 0x4A4A4A);//网格线，大小，线条数量，中线颜色，线颜色
	scene.add(gridline);
	//*************************************************************
	//轨道控制器
	var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);//对象
	//设置摄像机初始位置
	camera.position.set(0,8,12);//设置
	orbitControls.update();//必须调用一次轨道控制器的更新方法
	//*************************************************************
	//每帧内容
	function render(){
		renderer.render(scene, camera);//渲染
	}
	//帧率速度
	var update = setInterval(function(){
		requestAnimationFrame(render);//请求浏览器刷新
	},50);
	//*************************************************************
	//坐标系角标类
	var pos_sys_obj = new pos_sys( orbitControls, camera, document.getElementById("3d_2") );//轨道控制器对象，摄像机对象，需要显示角标的div
	//坐标系角标类
	var pos_sys_obj2 = new pos_sys( orbitControls, camera, document.getElementById("3d_3") );//轨道控制器对象，摄像机对象，需要显示角标的div
</script>