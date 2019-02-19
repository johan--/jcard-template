# J-Card Template

Printable in-browser template for cassette tape J-cards.


## Users

**Download the latest package
[[^](https://github.com/BrendonIrwan/jcard-template/raw/master/release/J-Card%20Template%20u0r0.zip)]**

Then open the `J-Card Template,html` with your web browser.


## Developers

As with most web-based programs, the sources are the executables themselves.


## About The Project

This is a fork of Blaine Murphy's repository [[^](https://gitlab.com/unixispower/jcard-template)].
I started this project for two reasons:

First, I found this template back in early 2018 when browsing around Hugo's blog
posts, and used it for all my mix tapes since then. Hugo is the person
responsible for [[The Walkman Archive](http://walkman-archive.com)]. I like its
simplicity and ease of use compared to those templates slapped into Word
document files that obviously will look wrong in LibreOffice.

However, I ran into a problem: Microsoft's Print To PDF feature did not
cooperate well with Waterfox, a Firefox-based web browser. So I had to cave and
use Internet Explorer--being my only alternative browser--as a remedy. Because
Internet Explorer is so old, some texts were not displaying properly, turns out
that the fix was just defining an extra CSS rule to the spine title group.

Second, I felt that I must maintain my base-level HTML + JavaScript skills I
acquired back in late 2016. So I set myself a challenge to modify and add new
features to the existing template. This challenge meant actually reading and
understanding someone else's code, which I have never done to this point.

I am glad how it turned out. I started at 02/18/2019 03 00, then paused at 05 45
to get some sleep, then took another five hours or so to finish the remainder.
Lame but at least it was a start.

A part of the original project I had to strip out is server integration, because
I have no experience nor any knowledge about them at the moment. So everything
is being run offline, which itself is beneficial in its own ways.


## Fonts

Fonts in the `static/fonts` directory were created by Yann Le Coroller and
are released under a custom license, see `static/fonts/LICENSE` for details.
