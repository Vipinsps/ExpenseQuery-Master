import React from 'react'

const Robot = ({isAnimating,loading,category,month,ani,model}) => {
  // loading when data is fethced from api
  // isAnimating is when sending the query and selecting 
  // when we have category, model and month the ani is true
  return (
    <div
            className={`robot-container ${
              isAnimating ? "start-animation" : ""
            }`}
          >
            <div className="universe">
              {isAnimating && !month &&(
                <span className="cooking">Something is cooking...</span>
              )}
              {loading && (
                <span className="cooking1">Building your response...</span>
              )}
              {!loading && !isAnimating && !category && !month && (
                <span className="cooking">
                  Am here to help you happily.
                </span>
              )}
              {(isAnimating && !ani && month) && (
                <span className="cooking2">
                  Interesting you are adding.
                </span>
              )}
              {/* // when all inputs are available then it will work */}
              {ani && !loading && (
                <span className="cooking3">Waiting you to hit Go</span>
              )}
              <div className="tattoine">
                <div className="bb-8">
                  <div
                    className={`head ${
                      isAnimating ? "head-animation" : ""
                    }`}
                  >
                    <div className="eye"></div>
                  </div>
                  <div
                    className={`ball ${
                      isAnimating ? "ball-animation" : ""
                    }`}
                  >
                    <div className="connect one"></div>
                    <div className="connect two"></div>
                    <div className="connect three"></div>
                    <div className="ball__inner one">
                      <div className="inside"></div>
                    </div>
                    <div className="ball__inner two">
                      <div className="inside"></div>
                    </div>
                    <div className="ball__inner three">
                      <div className="inside"></div>
                    </div>
                  </div>
                </div>
                <div className="bb-8--shadow"></div>
                <div className="bb-8--shadow--2"></div>
                <div className="land"></div>
              </div>
            </div>
          </div>
  )
}

export default Robot