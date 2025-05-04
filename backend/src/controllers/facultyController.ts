// import { Request, Response } from "express";
// import { createFaculty, getAllFaculty } from "../models/facultyModel";
// import { findUserByEmail } from "../models/userModel";
// import { createUser } from "../models/userModel";

// import { Role } from "@prisma/client";

// export const registerFaculty = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { name, description, email, password } = req.body;

//         const existingUser = await findUserByEmail(email);

//         if (existingUser) {
//             res.status(400).json({ error: "User with this email already exists!" });
//         }

//         // 2. Create a new User record with the FACULTY role
//         const newUser = await createUser(
//             {
//                 name,
//                 email,
//                 password,
//                 role: Role.FACULTY,
//             },
//             {} // Provide an empty object or appropriate extraData
//         );

//         if (!newUser?.id) {
//             res.status(500).json({ error: "Failed to create user for faculty." });
//         }

//         // 3. Create the Faculty-specific record, linking it to the User
//         const newFaculty = await createFaculty({
//             userId: newUser.id, // Provide the userId from the newly created User
//             facultyName: name,
//             description,
//         });

//         res.status(201).json({ message: "Faculty created successfully!" });

//     } catch (err) {
//         console.error("Error registering faculty:", err);
//         res.status(500).json({ error: "Internal server error!" });
//     }
// };



// export const AllFaculty = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const faculties = await getAllFaculty();

//         if (!faculties || faculties.length === 0) {
//             res.status(404).json({ error: "No faculties exist!" });
//         }
//         res.status(200).json(faculties); // Send the list of faculties
//     } catch (err) {
//         console.error("Error fetching all faculties:", err);
//         res.status(500).json({ message: "Internal server error!!" });
//     }
// };


