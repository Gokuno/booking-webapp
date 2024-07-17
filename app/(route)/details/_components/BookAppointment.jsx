import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
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
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';

function BookAppointment({ doctor }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [note, setNote] = useState();
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ':00 AM',
      });
      timeList.push({
        time: i + ':30 AM',
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ':00 PM',
      });
      timeList.push({
        time: i + ':30 PM',
      });
    }

    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    const data = {
      data: {
        UserName: user.given_name + " " + user.family_name,
        Email: user.email,
        Time: selectedTimeSlot,
        Date: date.toISOString(), // Ensure the date is in ISO format
        doctor: doctor.id,
        Note: note,
      }
    };
  
    console.log("Booking Data:", data); // Log the data being sent
  
    GlobalApi.bookAppointment(data)
      .then(resp => {
        console.log(resp);
        if (resp) {
          GlobalApi.sendEmail(data).then(resp => {
            console.log(resp);
          });
          toast("Booking Confirmation sent on Email");
        }
      })
      .catch(error => {
        console.error("Error booking appointment:", error);
        toast.error("Error booking appointment. Please try again.");
      });
  };

  const isPastDay = (day) => {
    return day <= new Date();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">Agenda Consulta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agendar Consulta</DialogTitle>
          <DialogDescription>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                <div className="flex flex-col gap-3 items-baseline">
                  <h2 className="flex gap-2 items-center">
                    <CalendarDays className="text-primary h-5 w-5" />
                    Selecciona una Fecha
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isPastDay}
                    className="rounded-md border"
                  />
                </div>
                <div className="mt-3 md:mt-0">
                  <h2 className="flex gap-2 items-center mb-3">
                    <Clock className="text-primary h-5 w-5" />
                    Selecciona un Horario
                  </h2>
                  <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                    {timeSlot?.map((item, index) => (
                      <h2
                        key={index}
                        onClick={() => setSelectedTimeSlot(item.time)}
                        className={`p-2 border cursor-pointer text-center hover:bg-primary hover:text-white rounded-full ${
                          item.time === selectedTimeSlot && 'bg-primary text-white'
                        }`}
                      >
                        {item.time}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
              <Textarea
                className="mt-3"
                placeholder="Nota / Comentarios"
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              className="text-red-500 border-red-500"
              variant="outline"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={!(date && selectedTimeSlot)}
            onClick={saveBooking}
          >
            Listo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;