$(function(){
	// var elm = document.getElementsByClassName('draganddrop');
	var elm = document.getElementsByTagName("img");
	
	for ( var i=0 ; i < elm.length ; i++ )
	    {
	      elm[i].addEventListener("dragstart", function(evt){
	      	console.log("start");
	        evt.dataTransfer.setData("text/plain",evt.target.src);
	        evt.stopPropagation();
	      },false);
	    }
	    
	var droparea = document.getElementsByClassName("dropbox");

	for ( var i=0; i < droparea.length ; i++ ){
	    droparea[i].addEventListener("drop", function(evt){
	    	// console.log(evt)
		    var data = evt.dataTransfer.getData( "text/plain" );
		    var obj = document.getElementById(evt.target.id);
		    id = obj.id.slice(2);
		    console.log(id);
		 
		    // セレクターを作成
		    var newselecter = document.createElement("img");
		    // 新たに作ったセレクターに属性（src,class）を付ける
		    newselecter.setAttribute("src", data);
		    newselecter.classList.add("droppedimages");
			// console.log(newselecter);
		    if(data){
				var result = confirm('本当にコピペしますか？');
				if(result) {
					obj.appendChild(newselecter);
					$.ajax({
					    url: "indices/" + id + "/pictures/canvasurl",
					    type: "post",
					    data: {
					    	content: data,
					    	index_id: id
					    },
					    datatype: "text",
					    success: function(data){
					      alert('success');
					    },
					    error: function(jqXHR, textStatus, errorThrown){
			  			　alert(textStatus);
			    		  alert(errorThrown.message);
			    		  alert(jqXHR.status);
			    		  alert(jqXHR.responseText);
			    		},
					});
				} 
		    }
		    $(this).css({
	    		"border": "solid thin",
	    		"background-color": "white"
	    	});
	    	evt.preventDefault();
    	},false);
	    
	    droparea[i].addEventListener("dragenter" , function(evt){
	    	$(this).css({
	    		"background-color": "#efe",
	    		"border": "outset"
	    	});
	    	evt.preventDefault();
	    }, false);
	    droparea[i].addEventListener("dragover" , function(evt){
	    	$(this).css({
	    		"background-color": "efe",
	    		"border": "outset"
	    	});
	    	evt.preventDefault();
	    }, false);
	    
	    droparea[i].addEventListener("dragleave" , function(evt){
	    	$(this).css({
	    		"border": "solid thin",
	    		"background-color": "white"
	    	});
	    	evt.preventDefault();
	    }, false);
	}  
});


// $(function() {
// 	$(document).on('dblclick','.draganddrop',function(){
//     $(this).after($(this).clone());
// 	});
//     $('.draganddrop').draggable( {
//     	"opacity": 0.5,
// 	    start : function (event , ui){
// 			console.log("start event start" );
// 			console.log(event , ui);
// 		},
// 		// ドラッグ中に呼ばれる
// 		drag : function (event , ui) {
// 			console.log("drag event start" );
// 			console.log(event , ui);
			
				
// 		},
// 		// ドラッグ終了時に呼ばれる
// 		stop : function (event , ui){
// 			console.log("stop event start" );
// 			console.log(event , ui);
// 			$(this).clone()
// 				.css({opacity: 1});
		
// 		}
// 	});
	
// 	$('td.t-4').droppable({
// 	    accept: '.draganddrop',
// 	    drop: function(event, ui) {
// 	        ui.draggable.appendTo('td.t-4');
// 	        ui.draggable.css({
// 	        	position:"absolute",
// 	        	opacity: 1
// 	        });
// 	    },
// });
// });

