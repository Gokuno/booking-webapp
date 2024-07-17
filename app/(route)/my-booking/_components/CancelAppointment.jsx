import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
  
function CancelAppointment({onContinueClick}) {

    
  return (
    <AlertDialog>
    <AlertDialogTrigger>
    <Button variant="outline" className="text-primary border-primary">Cancelar Cita</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Estas seguro que quieres cancelar?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta accion es permanente. Se eliminara la cita agendada de nuestro servidor.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={()=>onContinueClick()}>Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default CancelAppointment