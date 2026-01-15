<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class TranslationController extends Controller
{
    public function index($locale)
    {
        if (!in_array($locale, ['en', 'es'])) {
            return response()->json(['error' => 'Locale not supported'], 400);
        }

        // Load PHP lang files and convert to JSON
        $path = base_path("lang/$locale");
        $strings = [];

        if (File::exists($path)) {
            $files = File::files($path);
            foreach ($files as $file) {
                $name = $file->getFilenameWithoutExtension();
                $strings[$name] = require $file->getPathname();
            }
        }
        
        // Also check if there are json files in lang root
        $jsonFile = base_path("lang/$locale.json");
        if (File::exists($jsonFile)) {
            $jsonStrings = json_decode(File::get($jsonFile), true);
            if ($jsonStrings) {
                $strings = array_merge($strings, $jsonStrings);
            }
        }

        return response()->json($strings);
    }
}
