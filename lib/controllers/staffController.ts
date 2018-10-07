import * as mongoose from "mongoose";
import { StaffSchema } from "../models/staffModel";
import { Request, Response } from "express";

const Staff = mongoose.model('Staff', StaffSchema);

export class StaffController {
    public addNewStaff(req: Request, res: Response) {
        let newStaff = new Staff(req.body);

        newStaff.save((err, staff) => {
            if (err) {
                res.send(err);
            } else {
                res.json(staff);
            }
        });
    }

    public getStaffs(req: Request, res: Response) {
        Staff.find({}, (err, staffs) => {
            if (err) {
                res.send(err);
            } else {
                res.json(staffs);
            }
        });
    }

    public getStaff(req: Request, res: Response) {
        Staff.findById(req.params.staffId, (err, staff) => {
            if (err) {
                res.send(err);
            } else {
                res.json(staff);
            }
        });
    }

    public updateStaff(req: Request, res: Response) {
        Staff.findOneAndUpdate({ _id: req.params.staffId }, req.body, {new: true}, (err, staff) => {
            if (err) {
                res.send(err);
            } else {
                res.json(staff);
            }
        });
    }

    public deleteStaff(req: Request, res: Response) {
        Staff.remove({ _id: req.params.staffId }, (err, staff) => {
            if (err) {
                res.send(err);
            } else {
                res.json(staff);
            }
        });
    }
}