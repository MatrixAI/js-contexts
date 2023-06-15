
// IF you have a `@monitored`
// That means you have `@timedCancellable` at thes ame time
// You can do `@timed` `@cancellable`
// But instead `@timedCancellable` combines them all
// SO @monitored does it too
// Cause if you can lock things... you can also use the timer and monitor
// Due to the usageo f the locking ctx
// await ctx.monitor.lock(...)
// someotherfunction(ctx)
// it passes the monitor down there
// Well the problem is that whe nyou do it
// you'd need to have the timer monitor applied?
// you don'tn eed to apply the ctx
// the ctx is automtaically applied( so the function ctx of timer and signal)
// isautomatically applied to all LOCKS
// when you do this you also need to use the ability to create a monitor
// obj.withMonitor(async (monitor) => {
// })

// I wnat to see to quickly prototyep what this will look like


function monitored() {

}

export default monitored;
