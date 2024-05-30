"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddNewStudent = () => {
    const [gradesList, setGradesList] = useState([])
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    //THIS WILL CALL THE getallGradesList function which will fetch all the grades from the database
    useEffect(() => {
        GetAllGradesList()
    },[])
    
    const GetAllGradesList=()=>{
        GlobalApi.GetAllGrades().then((res)=>{
            // console.log(res.data.grades)
            setGradesList(res.data.grades)
        })
    }
    const onSubmit = (data) => {
        // console.log(data)
        GlobalApi.CreateNewStudent(data).then((res)=>{
            // console.log(res)
            if(res.data){
                toast('New Student Added')
            }
        })
        
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>+ Add New Student</Button>
                </DialogTrigger>
                <DialogContent>
                            <form onSubmit= {handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Add New Student!</DialogTitle>
                                <div className="py-3">
                                    <label htmlFor="name"> Full Name</label>
                                    <Input placeholder="Ex. John Doe" id="name" {...register("name", { required: true })} />
                                </div>
                                <div>
                                    <label className="mr-2">Select Grade</label>
                                    <select className="p-1" {...register("grade", { required: true })}>
                                        {gradesList.map((item,idx) => (
                                            <option key={idx} value={item.grade}>{item.grade}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="py-3">
                                    <label htmlFor="name"> Contact</label>
                                    <Input placeholder="1234567890" id="contact" {...register("contact", { required: true })} />
                                </div>
                                <div className="py-3">
                                    <label htmlFor="name"> Address</label>
                                    <Input placeholder="New Delhi" id="address" {...register("address", { required: true })} />
                                </div>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Close</Button>
                        </DialogClose>
                            <Button type="submit">Save</Button>
                    </DialogFooter>
                            </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddNewStudent;
