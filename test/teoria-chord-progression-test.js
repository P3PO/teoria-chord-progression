describe('Teoria Chord Progression', function() {
    var DIST = process.cwd() + '/dist',
        assert = require('assert'),
        teoria = require('teoria'),
        createProgression = require(DIST + '/teoria-chord-progression');

    describe('with invalid arguments', function() {
        it('throws an error if correct number of args aren\'t provided', function() {
            assert.throws(createProgression, /Expected 2 arguments but received 0./);
        });

        it('throws an error if TeoriaScale is not provided', function() {
            assert.throws(function() { createProgression('not a scale', []); }, /Invalid argument: TeoriaScale./);
        });

        it('throws an error if Array is not provided', function() {
            var scale = teoria.scale('c', 'major');
            assert.throws(function() { createProgression(scale, 'not an array'); }, /Invalid argument: Integer Array./);
        });

        it('throws an error if Array contains NaNs', function() {
            var scale = teoria.scale('c', 'major');
            assert.throws(function() { createProgression(scale, [1, 2, 'egg']); }, /Invalid argument: Integer Array./);
        });

        it('throws an error if Array contains numbers outside of provided scale\'s range', function() {
            var scale = teoria.scale('c', 'major'),
                degrees = scale.notes().length;
            assert.throws(function() { createProgression(scale, [1, 2, degrees + 1]); }, /Invalid Progression: Scale has 7 degrees./);
        });
    });

    describe('Parses chords correctly', function() {
        var cMajScale,
            fSharpMajScale,
            chords;

        beforeEach(function() {
            cMajScale = teoria.scale('c3', 'major');
            fSharpMajScale = teoria.scale('f#3', 'major');
            chords = [1,2,3,4,5,6,7];
        });

        it('C Major', function() {
            var progression = createProgression(cMajScale, chords),
                C = teoria.chord('C', 3),
                DMinor = teoria.chord('Dm', 3),
                EMinor = teoria.chord('Em', 3),
                F = teoria.chord('F', 3),
                G = teoria.chord('G', 3),
                AMinor = teoria.chord('Am', 3),
                BDiminished = teoria.chord('Bdim', 3);

            assert.deepEqual(progression.chords[0], C);
            assert.deepEqual(progression.chords[1], DMinor);
            assert.deepEqual(progression.chords[2], EMinor);
            assert.deepEqual(progression.chords[3], F);
            assert.deepEqual(progression.chords[4], G);
            assert.deepEqual(progression.chords[5], AMinor);
            assert.deepEqual(progression.chords[6], BDiminished);
        });

        it('F# Major', function() {
            var progression = createProgression(fSharpMajScale, chords),
                FSharpChord = teoria.chord('F#', 3),
                GSharpMinor = teoria.chord('G#m', 3),
                ASharpMinor = teoria.chord('A#m', 3),
                B = teoria.chord('B', 3),
                CSharp = teoria.chord('C#', 4),
                DSharpMinor = teoria.chord('D#m', 4),
                ESharpDiminished = teoria.chord('E#dim', 4);

            assert.deepEqual(progression.chords[0], FSharpChord);
            assert.deepEqual(progression.chords[1], GSharpMinor);
            assert.deepEqual(progression.chords[2], ASharpMinor);
            assert.deepEqual(progression.chords[3], B);
            assert.deepEqual(progression.chords[4], CSharp);
            assert.deepEqual(progression.chords[5], DSharpMinor);
            assert.deepEqual(progression.chords[6], ESharpDiminished);
        });
    });
});