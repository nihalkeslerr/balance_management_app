import React from 'react'

function WarningModal({closeModal,modalMessage}) { //Uyarı Modalı
  return (
    <div>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white px-4 py-14 w-1/4 rounded-lg shadow-lg text-center">
            <div className=" ">
              <p
                className={`font-semibold uppercase ${modalMessage.color} text-lg m-0`}
              >
                {modalMessage.message}
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default WarningModal