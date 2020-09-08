//*************************************************************
//*************************************************************
/*
这是一个基于轨道控制器的，显示坐标系角标用的类
需要绑定的参数包括，轨道控制器对象，主摄像机对象，放置坐标系的div对象
效果案例，可以参考，http://www.gamesea.net/3d_pos_sys/
github地址，https://github.com/chenjie0827/js
如果有需要，可以与作者本人交流，QQ=65167201
*/
//*************************************************************
//*************************************************************
//坐标系角标类
function pos_sys( orbitControls_obj, camera_obj, div_obj ){
	//*************************************************************
	//引用
	var _this = this;
	//*************************************************************
	//绑定对象
	this.orbitControls_obj = orbitControls_obj;//需要绑定的轨道控制器对象
	this.camera_obj = camera_obj;//需要绑定的摄像机
	this.div_obj = div_obj;//需要显示坐标系用的div
	//*************************************************************
	//创建场景
	var w = this.div_obj.clientWidth || this.div_obj.offsetWidth;
	var h = this.div_obj.clientHeight || this.div_obj.offsetHeight;
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 1000);
	this.renderer = new THREE.WebGLRenderer( {alpha: true} );//允许透明
	this.renderer.domElement.style.outline = "none";//去掉边框
	this.renderer.setClearAlpha(0);//设置透明度
	this.renderer.setSize(100, 100);//渲染器大小
	var canvas = this.renderer.domElement;
	div_obj.appendChild(canvas);//添加到页面
	var light = new THREE.AmbientLight(0xffffff,0.75);//光源颜色
	this.scene.add(light);//添加到场景
	//*************************************************************
	//几何体
	var geometry = new THREE.CubeGeometry(3,3,3);
	//canvas贴图方法
	function getTextCanvas(text){ 
		var width=128, height=128; 
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = '#C3C3C3';//填充颜色
		ctx.fillRect(0, 0, width, height);//绘制矩形框
		ctx.font = 50+'px " bold';//文字大小
		ctx.fillStyle = '#2891FF';//文字颜色//2891FF
		ctx.textAlign = 'center';//左右居中
		ctx.textBaseline = 'middle';//上下居中
		ctx.fillText(text, width/2,height/2);//填充文字
		return canvas;
	}
	//材质
	material = [
		new THREE.MeshBasicMaterial( {map: new THREE.CanvasTexture( getTextCanvas('右') )} ),//下标0：右面材质
		new THREE.MeshBasicMaterial( {map: new THREE.CanvasTexture( getTextCanvas('左') )} ),//下标1：左面材质
		new THREE.MeshBasicMaterial( {map: new THREE.CanvasTexture( getTextCanvas('上') )} ),//下标2：上面材质
		new THREE.MeshBasicMaterial( {map: new THREE.CanvasTexture( getTextCanvas('下') )} ),//下标3：下面材质
		new THREE.MeshBasicMaterial( {map: new THREE.CanvasTexture( getTextCanvas('前') )} ),//下标4：前面材质
		new THREE.MeshBasicMaterial( {map: new THREE.CanvasTexture( getTextCanvas('后') )} ),//下标5：后面材质
    ];
	//预制体
	this.cube = new THREE.Mesh(geometry, material);
	this.scene.add(this.cube);//添加到场景
	//*************************************************************
	//每帧内容
	this.render = function(){
		//获取位置
		var c_pos = _this.camera_obj.position.clone();//摄像机位置
		var v_pos = _this.orbitControls_obj.target.clone();//中心点位置
		//物体始终在中心
		_this.cube.position.copy(v_pos);//物体始终在中心点
		//计算限制摄像机半径后的位置
		c_pos.sub(v_pos);		//还原到【000】点，摄像机位置
		c_pos.setLength(7);		//限制一下到圆心的距离
		c_pos.add(v_pos);		//还原到【非000】点，摄像机位置
		//写回新位置
		_this.camera.position.copy(c_pos);
		_this.camera.lookAt(v_pos);//摄像机看向中心点
		//渲染
		_this.renderer.render(_this.scene, _this.camera);
	}
	//*************************************************************
	//帧率速度
	this.update = setInterval(function(){
		requestAnimationFrame( _this.render );//请求浏览器刷新
	},50);
}