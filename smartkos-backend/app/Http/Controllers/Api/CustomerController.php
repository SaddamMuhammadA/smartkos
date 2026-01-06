<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        return Customer::orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_customer' => 'required|string|max:100',
            'no_telp' => 'nullable|string|max:20',
            'foto_ktp' => 'nullable|string',
        ]);

        return Customer::create($data);
    }

    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        $customer->update(
            $request->only(['nama_customer', 'no_telp', 'foto_ktp'])
        );

        return $customer;
    }

    public function destroy($id)
    {
        Customer::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Customer berhasil dihapus'
        ]);
    }
}
