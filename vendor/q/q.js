/*!
 * Q.js<https://github.com/itorr/q.js>
 * Version: 1.2
 * Built: 2014/12/28
 */
var Q=function(W,D,HTML,hash,arg,_arg,i,index,Regex,key,Q){
	HTML=D.documentElement;
	Regex=[];
	key='!';
	onhashchange=function(){
		//获取hash值(如#!home)，并取!后面的部分；第一次进来hash为''字符串
		Q.hash=hash=location.hash.substring(key.length+1);
		
		//将hash用'/'分割成数组；第一次arg为[""]
		arg=hash.split('/');

		//获取Regex的长度
		i=Regex.length;
		while(i--)
			//如果为真，说明url地址栏的hash与reg方法注册的正则匹配
			if(_arg=hash.match(Regex[i])){ //使用正则表达式模式对字符串执行查找，并将包含查找的结果作为数组返回。
				//匹配的情况下，把arg重新用匹配的结果赋值
				arg=_arg;
				//把arg第一项改为Regex里匹配的正则
				arg[0]=Regex[i];
				break;
			}

		//第一次进来arg[0]为空字符串
		if(arg[0] == '') { // default
			arg[0]=index;
		}
		
		//如果Q.pop为真，则把arg数组传给pop函数调用
		if(Q.pop) { 
			Q.pop.apply(W,arg);
		}

		//如果Q里面没有预告通过reg方法注册好的路由，则跳到otherwise默认路由
		if(!Q[arg[0]]) {
			arg[0]='otherwise';
		}

		//把arg数组的第一项移除，并返回第一项
		Q.lash=hash=arg.shift();

		//在html标签上设置键为'hash'，字为变量hash的属性
		HTML.setAttribute('hash',hash);

		//调用预先注册在Q上的hash函数，并传入arg参数数组
		Q[hash].apply(W,arg);
	};

	
	if(!'onhashchange' in W){
		Q.path=location.hash;
		setInterval(function(){
			if(Q.path!=location.hash){
				onhashchange();
				Q.path=location.hash;
			}
		},100);
	}

	Q={
		//第二步：初始化
		init:function(o){
			//debugger;
			//如果o.key传入了自定义的key分隔符
			if(o.key!==undefined)
				key=o.key;
			//index取传入的o.index，否则取'V'
			index=o.index||'otherwise';

			if(o.pop&&typeof o.pop=='function')
				Q.pop=o.pop;

			onhashchange();

			return this
		},
		//第一步：先注册hash和回调函数
		reg:function(r,u){
			if(!r)
				return;

			if(u == undefined)
				u=function(){};

			if(r instanceof RegExp){ //正则注册
				Q[r]=u;
				Regex.push(r);
			}else if(r instanceof Array){ //数组注册
				for(var i in r){
					this.reg.apply(this,[].concat(r[i]).concat(u));
				}
			}else if(typeof r=='string'){ //关键字注册
				//在Q对象上添加{r: u}对象，r为reg方法注册的hash名，u为reg方法注册的回调函数
				if(typeof u=='function')
					Q[r]=u;
				else if(typeof u=='string'&&Q[u])
					Q[r]=Q[u];
			}	
			
			return this
		},
		go:function(u){
			location.hash='#'+key+u;
			return this
		}
	};
	return Q;
}(this,document);