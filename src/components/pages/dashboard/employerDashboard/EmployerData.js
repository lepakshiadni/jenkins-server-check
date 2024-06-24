import GridViewIcon from "@mui/icons-material/GridView";
import { PiUserListDuotone } from "react-icons/pi";
import { GrResources } from "react-icons/gr";
import { GrCopy } from "react-icons/gr";


import { IoList } from "react-icons/io5";
import { HiOutlineViewGrid } from "react-icons/hi";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineMessage } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { SlSettings } from "react-icons/sl";
import { GoChecklist } from "react-icons/go";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { TbLockSquare } from "react-icons/tb";
import { IoMdPhotos } from "react-icons/io";
export const option = [
  {
    name: "Dashboard",
    icon: (
      <HiOutlineViewGrid style={{ fontSize: "25px", marginRight: "10px" }} />
    ),
  },
  {
    name: "Feed",
    icon: <BsCardChecklist style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
  {
    name: "TrainerList",
    // icon: <IoList style={{ fontSize: "25px", marginRight: "10px" }} />,
    icon: <PiUserListDuotone style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
  {
    name: "Post a Requirements",
    icon: (
      <FaRegPenToSquare style={{ fontSize: "25px", marginRight: "10px" }} />
    ),
  },
  {
    name: "My Training Management",
    icon: <BsCardChecklist style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
  {
    name: "Proposals Management",
    icon: (
      <GoChecklist style={{ fontSize: "25px", marginRight: "10px" }} />
    ),
  },
  {
    name: "My Posts",
    icon: <IoMdPhotos style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
  {
    name: "Training Resource",
    // icon: <GridViewIcon style={{ fontSize: "25px", marginRight: "10px" }} />,
    // icon: <GrResources style={{ fontSize: "25px", marginRight: "10px" }} />,
    icon: <GrCopy style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
  {
    name: "Messages",
    icon: (
      <MdOutlineMessage style={{ fontSize: "25px", marginRight: "10px" }} />
    ),
  },
  {
    name: "Settings",
    icon: <SlSettings style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
  {
    name: "Help & Support",
    icon: <BiHelpCircle style={{ fontSize: "25px", marginRight: "10px" }} />,
  },
  // {
  //   name: "Privacy & Security",
  //   icon: <TbLockSquare style={{fontSize:"25px", marginRight:"10px"}}  />,
  // },
];
