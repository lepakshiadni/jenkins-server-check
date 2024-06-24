// import GridViewIcon from "@mui/icons-material/GridView";
import { HiOutlineViewGrid } from "react-icons/hi";
import { MdOutlineMessage } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { SlSettings } from "react-icons/sl";
import { MdDynamicFeed } from "react-icons/md";
import GridViewIcon from "@mui/icons-material/GridView";
import { IoMdPhotos } from "react-icons/io";



export const option = [
  {
    name: "Dashboard",
    icon: <HiOutlineViewGrid style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
  {
    name: "Feed",
    icon: <MdDynamicFeed style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
  {
    name:"My Posts",
    icon: <IoMdPhotos style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
  {
    name: "My Trainings",
    icon: <BsCardChecklist style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
  {
    name: "Messages",
    icon: <MdOutlineMessage style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
  {
    name: "Proposal Management",
    icon: <MdOutlineMessage style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
  {
    name: "Settings",
    icon: <SlSettings style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
  {
    name: "Training Resource",
    icon: <GridViewIcon style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
  {
    name: "Help & Support",
    icon: <BiHelpCircle style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
];