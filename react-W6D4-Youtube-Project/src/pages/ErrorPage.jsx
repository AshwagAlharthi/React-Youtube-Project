import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="bg-[#e1d9cf] w-full h-screen py-20 flex justify-center items-center">
            <div className="mockup-window bg-[#263238] border w-[40vw] h-[50vh] max-sm:w-[90vw]">
                <div className=" flex flex-col justify-evenly items-center h-full bg-[#C19A6B] text-center text-black text-xl font-semibold ">
                    {/* <div className="flex flex-col justify-evenly items-center text-center w-[40vw] h-[50vh] bg-white bg-opacity-50 rounded-lg text-2xl text-black max-sm:w-[90vw]"> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="60px"
                            viewBox="0 -960 960 960"
                            width="60px"
                            fill="#b92222">
                            <path
                                d="m40-120 440-760 440 760H40Zm115.33-66.67h649.34L480-746.67l-324.67 560ZM482.78-238q14.22 0 23.72-9.62 9.5-9.61 9.5-23.83 0-14.22-9.62-23.72-9.61-9.5-23.83-9.5-14.22 0-23.72 9.62-9.5 9.62-9.5 23.83 0 14.22 9.62 23.72 9.62 9.5 23.83 9.5Zm-33.45-114H516v-216h-66.67v216ZM480-466.67Z"
                            />
                        </svg>
                        <h1 className="text-[#b92222]">Oops!</h1>
                        <p className="w-[80%]">Sorry, an unexpected error has occurred.</p>
                        <p>
                            <i>{error.statusText || error.message}</i>
                        </p>
                    </div>
                {/* </div> */}
                {/* <div className="flex flex-col justify-evenly items-center text-center w-[40vw] h-[50vh] bg-white bg-opacity-50 rounded-lg text-2xl text-black max-sm:w-[90vw]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="40px"
                    viewBox="0 -960 960 960"
                    width="40px"
                    fill="#b92222">
                    <path
                        d="m40-120 440-760 440 760H40Zm115.33-66.67h649.34L480-746.67l-324.67 560ZM482.78-238q14.22 0 23.72-9.62 9.5-9.61 9.5-23.83 0-14.22-9.62-23.72-9.61-9.5-23.83-9.5-14.22 0-23.72 9.62-9.5 9.62-9.5 23.83 0 14.22 9.62 23.72 9.62 9.5 23.83 9.5Zm-33.45-114H516v-216h-66.67v216ZM480-466.67Z"
                    />
                </svg>
                <h1 className="text-[#b92222]">Oops!</h1>
                <p className="w-[80%]">Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>*/}
            </div> 

            </div>
            );
}

            export default ErrorPage