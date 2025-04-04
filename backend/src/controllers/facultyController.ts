import { Request, Response } from "express";
import { createFaculty, findFacultyByName, getAllFaculty } from "../models/facultyModel";



export const registerFaculty = async(req:Request, res:Response) =>{
    try {
        const {name, description, departments} = req.body;

        const existingFaculty = await findFacultyByName(name);

        if(existingFaculty){
            res.status(400).json({error: "faculty already exists!"})
        }

        const newFaculty = await createFaculty(
            {
                name,
                description,
                departments
            }
        )

        res.status(201).json({message: "Faculty created successfully!"})

    } catch (err) {
        res.status(500).json({error:"Internal server error!"})
    }
}


export const AllFaculty =  async(req:Request, res:Response) =>{
    try {
        const faculties = await getAllFaculty();

        if(!faculties || faculties.length === 0){
            res.status(404).json({error: "No faculties exist!"})
        }
    } catch (err) {
       res.status(500).json({message: "Internal server error!!"})        
    }
}



