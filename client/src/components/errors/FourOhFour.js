import React from "react";

// component rendered if user tries to go to an endpoint that doesn't exist
export default function FourOhFour() {
  return (
    <div className="four-oh-four-page">
      <h2>404: Page Does Not Exist</h2>
      <p>But since you are here, enjoy this song</p>
      <iframe
        title="rick-rolled"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  );
}
