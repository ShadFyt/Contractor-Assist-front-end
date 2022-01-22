import React from "react";

import ClockInForm from "./clockInForm"
import {useDeleteTimeEntryMutation, } from "../../../features/api/apiSlice"


import { 
    Box, 
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Button,
    IconButton, } from "@chakra-ui/react";

    import {RiMenuUnfoldLine} from "react-icons/ri"


const TimeEntryPopOver = ({timeEntry, employeeName}) => {
    const [deleteTimeEntry] = useDeleteTimeEntryMutation()
    const handleDelete = async (id) => {
        await deleteTimeEntry(id)
        }

    return (
        <Popover>
            <PopoverTrigger><IconButton size={"lg"} bg={"white"} icon={<RiMenuUnfoldLine />} /></PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Edit or Delete</PopoverHeader>
                <PopoverBody>
                    <ClockInForm timeEntry={timeEntry} employeeName={employeeName}/>
                    <Button onClick={() => handleDelete(timeEntry.id)}>Delete</Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default TimeEntryPopOver