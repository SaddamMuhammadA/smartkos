<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MasterKos;
use Illuminate\Http\Request;

class MasterKosController extends Controller
{
    public function index()
    {
        return MasterKos::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_kos' => 'required',
            'alamat_kos' => 'nullable',
            'jenis_kos' => 'required',
        ]);

        return MasterKos::create($data);
    }

    public function update(Request $request, $id)
    {
        $kos = MasterKos::findOrFail($id);
        $kos->update($request->all());
        return $kos;
    }

    public function destroy($id)
    {
        MasterKos::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
