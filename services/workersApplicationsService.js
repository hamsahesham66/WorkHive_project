import asyncHandler from 'express-async-handler';
import WorkersApplications from '../models/workersApplicationsModel.js';

export const createWorkerApplication = asyncHandler(async (req, res) => {
    try {
        const {
          name,
          email,
          phone,
          age,
          region,
          categoryId,
          working_days,
          experience,
          terms,
        } = req.body;

        const photo = req.files?.photo ? req.files.photo[0].buffer : null;
        const front_id = req.files?.front_id ? req.files.front_id[0].buffer : null;
        const back_id = req.files?.back_id ? req.files.back_id[0].buffer : null;
        const newApplication = await WorkersApplications.create({
            name,
            email,
            phone,
            age,
            photo,
            front_id,
            back_id,
            region,
            categoryId,
            working_days: JSON.stringify(working_days), // Ensure working_days is stored as a JSON string
            experience,
            terms
        });
        const responseData = {
            id: newApplication.id,
            name: newApplication.name,
            email: newApplication.email,
            phone: newApplication.phone,
            age: newApplication.age,
            region: newApplication.region,
            categoryId: newApplication.categoryId,
            working_days: JSON.parse(newApplication.working_days), // Parse JSON string back to object
            experience: newApplication.experience,
            terms: newApplication.terms,
            submitted_at: newApplication.submitted_at,
        };
        res.status(201).json({
            status: 'success',
            data: {
                application: responseData
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message || 'An error occurred while creating the application'
        });
    }    
})