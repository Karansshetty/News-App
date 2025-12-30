import React from "react";

const About = () => {
  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="mb-2">About NewsMonkey</h1>
        <p className="lead mb-0">
          Stay updated with the latest headlines in one place.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">What you’ll find here</h5>
              <p className="card-text">
                NewsMonkey brings together top headlines and trending stories so you can
                quickly scan what’s happening. Open any story to read the full article from
                the original publisher.
              </p>

              <h6 className="mb-2">How to use</h6>
              <ul className="mb-0">
                <li>Browse headlines on the Home page</li>
                <li>Use Next/Previous to move between pages</li>
                <li>Tap “Read More” to open the full story</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Why NewsMonkey</h5>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="border rounded p-3 h-100">
                    <h6 className="mb-2">Quick overview</h6>
                    <p className="mb-0 small text-muted">
                      Skim multiple stories quickly with a clean card layout.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="border rounded p-3 h-100">
                    <h6 className="mb-2">Easy reading</h6>
                    <p className="mb-0 small text-muted">
                      Headlines and summaries designed for readability.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="border rounded p-3 h-100">
                    <h6 className="mb-2">Fresh updates</h6>
                    <p className="mb-0 small text-muted">
                      See new stories as they are published and picked up in headlines.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="border rounded p-3 h-100">
                    <h6 className="mb-2">Original sources</h6>
                    <p className="mb-0 small text-muted">
                      Read the full article on the publisher’s website.
                    </p>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <h5 className="card-title">Disclaimer</h5>
              <p className="mb-0 text-muted">
                Headlines, images, and summaries belong to their respective publishers.
                Availability of content can vary and some stories may not include an image
                or description.
              </p>
            </div>
          </div>

          <p className="text-muted small mt-3 mb-0">
            Content shown depends on availability from the news source.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
