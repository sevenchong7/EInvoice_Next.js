// import { CustomeModal } from "@/components/modal/custome-modal";
// import { Button } from "@/components/ui/button";
// import { Merchant, Role, User } from "@/constants/data";
// import { cn } from "@/lib/utils";
// import { useState } from "react";

// interface StatusActionProps {
//     data: Role;
// }

// export default function StatusAction({ data }: StatusActionProps) {
//     const [openModal, setOpenModal] = useState(false)
//     const [textVisible, setTextVisible] = useState(true);

//     const HandleStatus = () => {
//         setOpenModal(false)
//         setTextVisible(false);

//         setTimeout(() => {
//             setTextVisible(true);
//         }, 300);

//     }

//     return (
//         <>
//             <CustomeModal
//                 isOpen={openModal}
//                 onClose={() => setOpenModal(false)}
//                 loading={false}
//                 title={'Change Statue?'}
//                 titleClassName={'text-2xl font-medium items-center'}
//                 content={
//                     <>
//                         <div>
//                             <div className=" flex justify-center items-center text-center">
//                                 Are you sure you wan to change the user status
//                             </div>
//                             <div className="flex w-full justify-between items-center pt-10">
//                                 <Button onClick={() => setOpenModal(false)} className="bg-gray-400 hover:bg-gray-300">Cancel</Button>
//                                 <Button onClick={() => HandleStatus()} className="bg-blue-800 hover:bg-blue-600">Confirm</Button>
//                             </div>
//                         </div>
//                     </>
//                 }
//             />
//             <div>

//             </div>
//             {
//                 data.status == 'Pending Verification' ? <p className="text-orange-500 text-center text-nowrap text-xs">{data.status}</p> :
//                     <Button
//                         onClick={() => setOpenModal(true)}
//                         className={cn(
//                             "relative flex items-center transition-all duration-300 m-auto min-w-[100px]",
//                             data.status === "Active" ? "bg-blue-800 hover:bg-blue-700 justify-start" : "justify-end text-right",
//                             "rounded-lg"
//                         )}
//                     >
//                         <div
//                             className={cn(
//                                 "absolute rounded-full bg-white w-5 h-5 transition-all duration-300",
//                                 data.status === "Active" ? "translate-x-14 ease-linear" : "-translate-x-14 ease-linear"
//                             )}
//                         />
//                         <p
//                             className={cn(
//                                 textVisible ? "opacity-100 " : "opacity-0"
//                             )}
//                         >
//                             {data.status}
//                         </p>
//                     </Button>
//             }

//         </>
//     )
// }