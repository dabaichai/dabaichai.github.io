function freshAjax(){	
		    var dom = document.getElementById("container");
		    var myChart = echarts.init(dom);
		   // var id=document.getElementById("pro_id").value;
		    option = null;
		    
		    function randomData(id,a){
		     $.ajax({
		               type : "post",
		               async : false, //同步执行
		               url:"https://zhongchou.modian.com/realtime/get_simple_product?jsonpcallback=jQuery1_1&ids="+id+"&if_all=1&_=2",
						data : {},
		               datatype : "json", //返回数据形式为json
		       		success : function(result) {
		       				if(result){
		       				
								re=result.substring(41,result.length-3);
								var parse_json_by_JSON_parse= function(str){
									console.log("sucsess");
								    return JSON.parse(str);
								}
								 json1 = parse_json_by_JSON_parse(re);
								//console.log(json1.backer_money_rew);
								value=json1.backer_money_rew;
										}
			               		}
			               })
						   console.log("1",now);
				now = new Date(+now + 2000);
				//console.log("2",now);
		        return {
		            name: now.toString(),
					value:Math.round(value*a)
		            /*value: [
		                now,
		                Math.round(value)
		            ]*/
		        }
		    }
		    var data = [];
			var data2=[];
			var data3=[];
			var datetime=[];
		    var now = new Date();
		    var value = "";
		   var anchor = [
				    {name:new Date(+now + 1000), value:[new Date(+now + 1000), ]},
				    {name:new Date(+now + 60*60*1000), value:[new Date(+now + 60*60*1000), ]}
				    ]
		    
		    option = {
		        title: {
		            text: 'PK实时监控(金额已换算系数)'
		        },
		        tooltip: {
		            trigger: 'axis',
		            /*formatter: function (params) {
						console.log(params[0]);
		                params = params[0];
		                var date = new Date(params.name);
						console.log(date);
		                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " " + date.getHours() +":"+date.getMinutes() +":"+  date.getSeconds() + '' +'金额: ' + params.data.value;
		            },*/
		            axisPointer: {
		                animation: false
		            }
		        },
				//color:['#F4E001','26C0C0','F0805A'],
		        legend:{
		        	data:['河豚','兔子','狼崽']
		        },
		        xAxis: {
		            /*type: 'time',
		            splitLine: {
		                show: false
		            }*/
				
						type : 'category',
						boundaryGap : true,					
		        },
		        yAxis: {
		            type: 'value',
					scale:true, //设置坐标不从0开始
		            boundaryGap: ['20%', '20%'],					
		            splitLine: {
		                show: false
		            }
		        },
		        series: [{
		            name: '河豚',
		            type: 'line',
					//color:['#F4E001'],
					itemStyle: {
						normal: {
							color: "#F4E001",
							lineStyle: {
								color: "#F4E001"
							}
						}
					},
					symbolSize:6,
		            showSymbol: true,
		            hoverAnimation: false,
		            data: data
		        },{
		            name: '兔子',					
		            type: 'line',
					color:['#87CEFF'],
					symbolSize:6,  //拐点圆的大小
		            showSymbol: true,  //是否显示拐点圆
		            hoverAnimation: false,
		            data: data2
		        },{
		            name: '狼崽',
		            type: 'line',
					color:['#EE799F'],
					symbolSize:6,  //拐点圆的大小
		            showSymbol: true,  //是否显示拐点圆
		            hoverAnimation: false,
		            data: data3
		        },
				
		             /* {
					  name:'anchor',
					  type:'line', 
					  showSymbol:false, 
					  data:anchor,
					  itemStyle:{normal:{opacity:0}},
					  lineStyle:{normal:{opacity:0}}
					} */
		        ]
		    };
		    setInterval(function () {
					let yy=randomData('73843',1);
					let yy2=randomData('73840',0.37);
					let yy3=randomData('73839',0.52);
					console.log(yy);
					console.log("yy2",yy2);
		            data.push(yy);
					data2.push(yy2);
					data3.push(yy3);
					//datetime.push(yy.name);
					let date=new Date();
					let time=date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " " + date.getHours() +":"+date.getMinutes() +":"+  date.getSeconds();
					datetime.push(time);
					//console.log(data,new Date());
					myChart.setOption({
						xAxis:[{
							data:datetime
						}],
						series: [{
							type:'line',
							
							//color:['#F4E001'],
							data: data
						},
						{
							type:'line',
							//color:['26C0C0'],
							data: data2
						},
						{
							type:'line',
							//color:['F0805A'],
							data: data3
						}]
					});
					if(datetime.length >10){
						datetime.shift();
						data.shift();
						data2.shift();
						data3.shift();
					}
					
				}, 2000);
		    if (option && typeof option === "object") {
		        myChart.setOption(option, true);
		    }
}
