<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Lesson;

class LessonsController extends Controller
{
    public function index(){
        return view('show_lessons');
    }
    public function save(Request $request){
        $this->validate($request,[
            'name' =>'required',
            'description' =>'required',
        ]);

       // $name = $_POST['lessonName'];
        $lesson = new Lesson;
        $lesson->name =$request->input('name');
        $lesson->description =$request->input('description');
        $lesson->save();

  
    
    //return redirect('/');
       // return view('show_lessons');
    }

    public function get(){
        $lesson = Lesson::all();
    // $lesson = DB::table("lesson")->get();
    //echo json_encode($lesson);

    echo $lesson;
    // return view('show_lessons');
    }

    public function getSingle(Lesson $lesson){
        //$lesson = DB::table("lesson")->find($id);
        //$lesson = Lesson::find($id);
        echo json_encode($lesson);
    
        //echo ($lesson);
        // return view('show_lessons');
    }

    public function update(Request $request){
        $this->validate($request,[
            'name' =>'required',
            'description' =>'required',
        ]);
       
        $id =$request->id;
        $lesson = Lesson::findOrFail($id);
        $lesson->name =$request->name;
        $lesson->description =$request->description;
        $lesson->save();

        
    }

    public function delete($id){
        DB::table("lesson")->where('id', $id)->delete();
        $lesson = DB::table("lesson")->get();
        echo $lesson;
       // return view('show_lessons');
    }

  
    public function archives (){
        $lesson = Lesson:: selectRaw('year(created_at) year, monthname(created_at) month, count(*) Published')
        ->groupBy('year', 'month')
        ->orderBy ('created_at')
        ->get();

        echo $lesson;
        //return view('show_lessons', compact('lesson'));
    }
}
