import {Request, Response} from "express";
import {PatientController} from "../controllers/patientController";
import {StaffController} from "../controllers/staffController";

export class Routes {
    public patientController = new PatientController();
    public staffController = new StaffController();

    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'OK'
                });
            });

        app.route('/login')
            .get((req: Request, res: Response) => {
                console.log('Login get');
                res.send('Got the login page');
            })
            .post((req: Request, res: Response, next) => {
                
            })

        app.route('/patients')
            .get(this.patientController.getPatients);

        app.route('/patient')
            .post(this.patientController.addNewPatient);

        app.route('/patient/:patientId')
            .get(this.patientController.getPatient)
            .put(this.patientController.updatePatient)
            .delete(this.patientController.deletePatient);

        app.route('/staffs')
            .get(this.staffController.getStaffs);

        app.route('/staff')
            .post(this.staffController.addNewStaff);

        app.route('/staff/:id')
            .get(this.staffController.getStaff)
            .put(this.staffController.updateStaff)
            .delete(this.staffController.deleteStaff);
    }
}