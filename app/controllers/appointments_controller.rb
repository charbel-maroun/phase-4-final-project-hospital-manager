class AppointmentsController < ApplicationController

    before_action :authorized_patient

    def create
        appointment = Appointment.create!(appointment_params)
        render json: appointment, status: :created
    end


    def show
        appointment = Appointment.find_by(patient_id: session[:patient_id], id: params[:id])
        # byebug
        render json: appointment, status: :ok
    end

    def update 
        appointment = Appointment.find_by(patient_id: session[:patient_id], id: params[:id])
        appointment.update!(appointment_params)
        render json: appointment, status: :accepted
    end 

    def destroy
        appointment = Appointment.find_by(patient_id: session[:patient_id], id: params[:id])
        appointment.destroy
        head :no_content
    end

private 

    def appointment_params
        params.permit(:date, :time, :reason_for_visit, :doctor_id, :patient_id)
    end

end
