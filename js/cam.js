var imgNoData = 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22174%22%20height%3D%22130%22%20viewBox%3D%220%200%2046.0375%2034.395834%22%3E%3Cg%20transform%3D%22translate%280%20-262.604%29%22%3E%3Crect%20width%3D%2246.038%22%20height%3D%2234.396%22%20y%3D%22262.604%22%20ry%3D%22.802%22%20fill%3D%22%23fff%22/%3E%3Cpath%20d%3D%22M24.94%20274.065c-.91%200-1.642.71-1.69%201.608h-3.493v-.223c0-.62-.498-1.117-1.117-1.117-.618%200-1.116.498-1.116%201.117v.223h-.363c-1.68%200-3.032%201.353-3.032%203.034v3.852c0%201.68%201.353%203.032%203.033%203.032h11.717c1.68%200%203.033-1.352%203.033-3.033v-3.853c0-1.68-1.353-3.034-3.033-3.034h-.193c-.047-.897-.78-1.608-1.69-1.608zm-2.19%203.932a2.725%202.725%200%200%201%202.726%202.726%202.725%202.725%200%200%201-2.725%202.724%202.725%202.725%200%200%201-2.725-2.724%202.725%202.725%200%200%201%202.726-2.726z%22%20fill%3D%22%23646464%22/%3E%3Cg%20transform%3D%22matrix%281.33734%200%200%201.33734%205.327%20-99.67%29%22%20fill%3D%22none%22%20stroke%3D%22%23c8c8c8%22%20stroke-width%3D%221.323%22%3E%3Ccircle%20r%3D%2211.025%22%20cy%3D%22283.771%22%20cx%3D%2213.229%22/%3E%3Cpath%20d%3D%22M5.423%20291.63l15.613-15.653%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E';

function Cam(videoTag, canvasTag)
{
	this.videoTag = videoTag;
	this.canvasTag = canvasTag;
	this.video = null;
	this.canvas = null;
	this.ctx = null;
	this.localMediaStream = null;
	this.intervalCall = null;
	this.imgData = null;
	this.image = new Image();
	this.boundCanvasClickEvt = null;
};

Cam.prototype.setImg = function (imgData)
{
	this.imgData = imgData;
	this.image.src = this.imgData;
};

Cam.prototype.copyFrameToCanvas = function ()
{
	if(this.intervalCall)
	{
		if(this.localMediaStream)
		{
			this.ctx.drawImage(this.video, 0, 0, 174, 130);
			this.imgData = this.canvas.toDataURL('image/jpeg');
		}
	}
};

Cam.prototype.onCanvasClick = function ()
{
	if (this.localMediaStream)
	{
		if(this.intervalCall)
		{
			//stop refreshing the canvas
			clearInterval(this.intervalCall);
			this.intervalCall = null;
		}
		else
		{
			//restart capture
			this.intervalCall = setInterval(this.copyFrameToCanvas.bind(this), 100);
		}
	}
	else
	{
		//first click activate the webcam
		if (navigator.mediaDevices.getUserMedia)
		{
			navigator.mediaDevices.getUserMedia({video: true})
			.then(this.handleVideo.bind(this))
			.catch(this.videoError.bind(this));
			
			//and start synchronized refresh of the canvas
			this.intervalCall = setInterval(this.copyFrameToCanvas.bind(this), 100);
		}
		
		//old navigators does not support mediaDevices
		/*navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
		
		if (navigator.getUserMedia)
		{
			navigator.getUserMedia({video: true}, this.handleVideo.bind(this), this.videoError.bind(this));
			
			//and start synchronized refresh of the canvas
			this.intervalCall = setInterval(this.copyFrameToCanvas.bind(this), 100);
		}*/
	}
};

Cam.prototype.initCapture = function ()
{
	this.video = document.querySelector(this.videoTag);
	this.canvas = document.querySelector(this.canvasTag);
	if(this.canvas != null)
	{
		this.ctx = this.canvas.getContext('2d');
		this.ctx.drawImage(this.image, 0, 0);
		this.boundCanvasClickEvt = this.onCanvasClick.bind(this);
		this.canvas.addEventListener('click', this.boundCanvasClickEvt);
	}
};

Cam.prototype.closeCapture = function ()
{
	if(this.intervalCall)
	{
		//stop refreshing the canvas
		clearInterval(this.intervalCall);
		this.intervalCall = null;
	}
	
	if(this.localMediaStream)
	{
		this.video.pause();
		this.localMediaStream.getVideoTracks()[0].stop();
		this.localMediaStream = null;
	}
	
	if(this.boundCanvasClickEvt)
	{
		this.canvas.removeEventListener('click', this.boundCanvasClickEvt);
	}
};

Cam.prototype.handleVideo = function (stream)
{
	this.video.srcObject = stream;
	this.localMediaStream = stream;
};

Cam.prototype.videoError = function (e)
{
	//todo
};
