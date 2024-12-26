import React from 'react'

function WarningModal({closeModal,modalMessage}) {
  return (
    <div>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white px-4 pt-2 pb-3 w-1/4 rounded-lg shadow-lg text-center">
            <div className=" float-end w-100">
              <button
                onClick={closeModal}
                className=" text-gray-600 px-2 py-1 rounded-md float-end hover:bg-gray-200"
              >
                X
              </button>
            </div>
            <div className=" ">
              <p
                className={`font-semibold uppercase ${modalMessage.color} text-lg`}
              >
                {modalMessage.message}
              </p>
            </div>
            {/*  <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-2 py-1 rounded-md w-full"
            >
              Kapat
            </button> */}
          </div>
        </div>
    </div>
  )
}

export default WarningModal