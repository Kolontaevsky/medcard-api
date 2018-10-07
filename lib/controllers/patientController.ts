import * as mongoose from "mongoose";
import { PatientSchema } from "../models/patientModel";
import { Request, Response } from "express";

const Patient = mongoose.model('Patient', PatientSchema);

export class PatientController {
    public addNewPatient(req: Request, res: Response) {
        let newPatient = new Patient(req.body);

        newPatient.save((err, patient) => {
            if (err) {
                res.send(err);
            } else {
                res.json(patient);
            }
        });
    }

    public getPatients(req: Request, res: Response) {
        Patient.find({}, (err, patients) => {
            if (err) {
                res.send(err);
            } else {
                res.json(patients);
            }
        });
    }

    public getPatient(req: Request, res: Response) {
        Patient.findById(req.params.patientId, (err, patient) => {
            if (err) {
                res.send(err);
            } else {
                res.json(patient);
            }
        });
    }

    public updatePatient(req: Request, res: Response) {
        Patient.findOneAndUpdate({ _id: req.params.patientId }, req.body, {new: true}, (err, patient) => {
            if (err) {
                res.send(err);
            } else {
                res.json(patient);
            }
        });
    }

    public deletePatient(req: Request, res: Response) {
        Patient.remove({ _id: req.params.patientId }, (err, patient) => {
            if (err) {
                res.send(err);
            } else {
                res.json(patient);
            }
        });
    }
}