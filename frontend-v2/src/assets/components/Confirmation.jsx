import { CgDanger } from "react-icons/cg";

export const Confirmation = ({ confirmation, setConfirmation, onLogout }) => {
    return (
        <>
            <div className={`justify-center items-center inset-0 fixed z-30 ${confirmation ? 'flex' : 'hidden'}`} >
                <div className={`bg-white shadow-xl w-fit p-8 flex flex-col gap-8 rounded-xl text-blue-600 sm:w-sm ${confirmation ? 'opacity-100' : 'opacity-0'} delay-100 transition-all`}>
                    <div className="flex flex-col gap-4 items-center">
                        <div className="text-red-600 bg-red-200 p-2 rounded-full"><CgDanger className="text-5xl" /></div>
                        <div className="text-center">
                            <h1 className="text-xl font-bold">Logout</h1>
                            <p>Are you sure want to logout?</p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button className="px-4 py-1 rounded-full border border-blue-600 active:text-white hover:text-white active:bg-blue-600 hover:bg-blue-600 delay-100 cursor-pointer transition-all" onClick={() => setConfirmation(false)} >No</button>
                        <button className="px-4 py-1 rounded-full bg-red-600 text-white active:bg-red-800 hover:bg-red-800 delay-100 cursor-pointer transition-all" onClick={onLogout}>Yes</button>
                    </div>
                </div>
            </div>
        </>
    )
}
