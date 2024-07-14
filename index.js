const timer_limit=7;
let buck_x=0;
let buck_y=0;
let play_ground_height=400;
let play_ground_width=400;
let bucket_height=20;
let bucket_width=20;
const Ball=document.getElementById('ball');
let ball_x;
let ball_y;
let score=0;
let newball;
let captured=false;
let timer_indc=document.createElement('p');
let ball_height=10;
let ball_width=10;
let game_over=false;
class ball{
    constructor(height,width){
        this.height=height;
        this.width=width;
        //this.notdone=true;
        this.start_timer();
    }
    start_timer(){
        
        
        ball_x=Math.floor(Math.random()*(play_ground_width/bucket_width))*bucket_width+Math.floor(Math.random()*(bucket_width-this.width));
        ball_y=Math.floor(Math.random()*(play_ground_height/bucket_height))*bucket_height+Math.floor(Math.random()*(bucket_height-this.height)); 

        Ball.style.width=this.width+"px";
        Ball.style.height=this.height+"px";
        Ball.style.left=ball_x+"px";
        Ball.style.top=ball_y+"px";
        Ball.style.display="flex";
        
        timer_indc.style.display="none";
        timer_indc=document.createElement('p');
        timer_indc.setAttribute('id','time_remaining');
        document.getElementById('container').appendChild(timer_indc);

        this.timer(timer_limit);

    }
    timer(time){
        if(captured){
            timer_indc.innerText="reseting";
            return ;
        }
        timer_indc.innerText="TIME REMAINING : "+time;
        if(time!=0){
            time--;
            setTimeout(()=>{
                this.timer(time);
            },1000);
        }
        else{
            timer_indc.innerText="TIME REMAINING : "+time+"  ( Game Over )";
            Ball.style.display="none";
            ball_x=-1;
            ball_y=-1;
            game_over=true;
            location.reload();
        }
       
    }
    
}

document.addEventListener('keydown',function(event){
    if(captured||game_over){
        return ;
    }
    if(event.key=="ArrowRight"){
        if(buck_x<play_ground_width-bucket_width){
            buck_x+=20;
        }
    }
    else if(event.key=="ArrowDown"){
        //console.log("down key pressed");
        if(buck_y<play_ground_height-bucket_height){
            buck_y+=20;
        }
    }
    else if(event.key=="ArrowLeft"){
        //console.log("left key pressed");
        if(buck_x>0){
            buck_x-=20;
        }
    }
    else if(event.key=="ArrowUp"){
        //console.log("up key pressed");
        if(buck_y>0){
            buck_y-=20;
        }
    }


    if(event.key=="ArrowUp"||event.key=="ArrowRight"||event.key=="ArrowLeft"||event.key=="ArrowDown"){
        document.getElementById('bucket').style.left=buck_x+"px";
        document.getElementById('bucket').style.top=buck_y+"px";
        captured=ball_caught();
        
        if(captured){
            
            document.getElementById('ball').style.display="none";
            score++;
            //document.getElementById('time_remaining').innerText="TIME REMAINING : "+timer_limit;
            document.getElementById('score').innerText="You score : "+score;
            
            setTimeout(()=>{captured=false;new ball(ball_height,ball_width);},1000);
            
            
        }
        

    }

});
function ball_caught(){
    if(ball_x>=buck_x&&ball_y>=buck_y&&ball_x+ball_width<=buck_x+bucket_width&&ball_y+ball_height<=buck_y+bucket_height){
        return true;
        
    }
    
    return false;
}
new ball(ball_height,ball_width);