/***** AUDIO CONTROLLER DOCUMENTATION ******/
// Set up all the Audio Component of the projects in the sounds list.
// Methods to call
/// PlayAudio of sound  by id-> plays the audio
/// PauseAudio of sound by id -> pauses the audio if it's playing
/// PlayAudioWithCallback of sound  by id-> plays the audio with callback once it's played once
/// CrossfadeAudios of sounds  by id1 and id2 -> crossfades between the audios id1 (fades out) and id2 (fades in)
/// FadeIn of sound ID -> plays an audio with a fade in 
/// FadeOut of sound ID -> fade out an audio

//@input Component.AudioComponent[] sounds

//Set repeatCounts to -1 if you want infinite looping
global.PlayAudio = (id, repeatCounts = 1) => {
    if (id < 0 || id > script.sounds.length - 1) {
        print("WARNING: Audio with id " + id + " does not exist.")
        return 
    }
    script.sounds[id].play(repeatCounts)
}

global.PlayAudioWithCallback = (id, callback) => {
    if (id < 0 || id > script.sounds.length - 1) {
        print("WARNING: Audio with id " + id + " does not exist.")
        return 
    }
    script.sounds[id].setOnFinish(callback)
    script.sounds[id].play(1)
}

global.StopAudio = (id, fade = false) => {
    if (id < 0 || id > script.sounds.length - 1) {
        print("WARNING: Audio with id " + id + " does not exist.")
        return 
    }
    if(script.sounds[id].isPlaying()) script.sounds[id].stop(fade)
}

global.PauseAudio = (id) => {
    if (id < 0 || id > script.sounds.length - 1) {
        print("WARNING: Audio with id " + id + " does not exist.")
        return 
    }
    if(script.sounds[id].isPlaying()) script.sounds[id].pause()
}

global.ResumeAudio = (id) => {
    if (id < 0 || id > script.sounds.length - 1) {
        print("WARNING: Audio with id " + id + " does not exist.")
        return 
    }
    if(script.sounds[id].isPaused()) script.sounds[id].resume()
}


let sound1, sound2
global.CrossfadeAudios = (id1, id2) => {
    if (id1 < 0 || id1 > script.sounds.length - 1) {
        print("WARNING: Audio with id " + id1 + " does not exist.")
        return 
    }
    if (id2 < 0 || id2 > script.sounds.length - 1) {
        print("WARNING: Audio with id " + id2 + " does not exist.")
        return 
    }
    let crossfadeSoundsTween = new CustomTween({
        onUpdate: (progress) => { 
            script.sounds[id1].volume = 1 - progress 
            script.sounds[id2].volume = progress         
        },
        onStart: () => { script.sounds[id2].play(1) },
        onComplete: () => { script.sounds[id1].stop(false) }
    })
    crossfadeSoundsTween.start()
}

global.FadeInAudio = (id) => {
    if (id < 0 || id > script.sounds.length - 1) {
        print("WARNING: Audio with id " + id + " does not exist.")
        return 
    }
    let fadeInSoundTween = new CustomTween({
        onUpdate: (progress) => { script.sounds[id].volume = progress },
        onStart: () => { script.sounds[id].play(1) }
    })
    fadeInSoundTween.start()
}


global.FadeOutAudio = (id) => {
    if (id < 0 || id > script.sounds.length - 1) {
        print("WARNING: Audio with id " + id + " does not exist.")
        return 
    }
    let fadeOutSoundTween = new CustomTween({
        onUpdate: (progress) => { script.sounds[id].volume = 1 - progress },
        onComplete: () => { script.sounds[id].stop(false) }
    })
    fadeOutSoundTween.start()
}

global.SetVolume = (id, vol, animate) => {
    if (id < 0 || id > script.sounds.length - 1) {
        print("WARNING: Audio with id " + id + " does not exist.")
        return 
    }

    if(!animate){
        script.sounds[id].volume = vol
        return;
    }

    const startVol = script.sounds[id].volume
    let volumeTween = new CustomTween({
        onUpdate: (progress) => { 
            const newVol = startVol + (vol - startVol) * progress
            script.sounds[id].volume = newVol 
        }
    })
    volumeTween.start()
}