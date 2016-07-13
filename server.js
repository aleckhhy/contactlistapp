var express=require('express');　　　　　　　　 //引用express模块
var app=express();　
var bodyParser=require('body-parser');
var mongojs=require('mongojs');
var db=mongojs('localhost/contactlist',['contactlist']);
// db=mongojs('aleckhao:mlab2016@ds035664.mlab.com:35664/contactlist',['contactlist']);　　　　　　　　　　　 //创建一个express实例
app.use(express.static(__dirname+"/public"));　　//告诉node服务器，静态文件位于哪里
app.use(bodyParser.json()); 
 app.get('/contactlist',function (req,res){　　　　　　　　   //服务器响应对根路径的get请求
	console.log("I recived a GET request");
	db.contactlist.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
 });

 app.post('/contactlist',function(req,res){
 	console.log(req.body);
 	db.contactlist.insert(req.body,function(err,doc){
 		res.json(doc);
 	});
 });
 app.delete('/contactlist/:id',function(req,res){
 	var id=req.params.id;
 	console.log(id);
 	db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
 		res.json(doc);
 	});
 });
 app.get('/contactlist/:id',function(req,res){
 	var id=req.params.id;
 	console.log(id);
 	db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
 		res.json(doc);
 	});
 });
 app.put('/contactlist/:id',function(req,res){
 	var id=req.params.id;
 	var name=req.body.name;
 	console.log(req.body.name);
 	db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
 		update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},
 		new:true},function(err,doc){
 		res.json(doc);
 	});
 });
 app.listen(3000);　　　　　　　　　　　　　　　//指定程序监听在3000端口
 console.log("Server running on port 3000");　 //在服务器的窗口中打印一行文本