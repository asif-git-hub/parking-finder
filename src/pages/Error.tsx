import React from "react"
export function NotFoundError() {
  return (
    <div className="not-found">
      {/* <img
        src={notFound}
        alt="An avatar lost holding a map"
        className="not-found-img"
      ></img> */}
      <p>
        Oops, it looks like you've taken a wrong turn! Either you're lost or the
        page you're looking for has gone on vacation.{" "}
      </p>
      <button
        className="btn"
        onClick={() => {
          window.open("/", "_blank", "noopener,noreferrer")
        }}
      >
        Take me back
      </button>
    </div>
  )
}
