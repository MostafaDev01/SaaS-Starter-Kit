import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Shield, Clock, User, Settings, Lock, Bell, ChevronRight } from 'lucide-react'
import SignOutButton from './SignOutButton'

/**
 * Dashboard Page — Server Component
 *
 * Fetches the user server-side and renders a premium dashboard
 * with account stats, quick actions, and profile information.
 */
export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  const firstName =
    user.user_metadata?.first_name ||
    user.user_metadata?.full_name?.split(' ')[0] ||
    'User'

  const lastName = user.user_metadata?.last_name || ''

  const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })

  const lastSignIn = user.last_sign_in_at
    ? new Date(user.last_sign_in_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Just now'

  const isEmailConfirmed = !!user.email_confirmed_at

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-emerald-500/20 shrink-0">
            {firstName[0]}{lastName?.[0] || ''}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Welcome back, <span className="text-emerald-400">{firstName}</span>
            </h1>
            <p className="text-zinc-500 mt-1 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right mr-2">
            <p className="text-[11px] text-zinc-600 uppercase tracking-wider font-medium">Member since</p>
            <p className="text-white text-sm">{memberSince}</p>
          </div>
          <SignOutButton />
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {/* Status Card */}
        <div className="group relative bg-zinc-900/80 border border-zinc-800 rounded-2xl p-7 overflow-hidden hover:border-zinc-700 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span className="text-zinc-500 text-sm">Account Status</span>
            </div>
            <p className="text-3xl font-bold text-emerald-400">Active</p>
            <p className="text-xs text-zinc-600 mt-1">
              {isEmailConfirmed ? '✓ Email confirmed' : '⏳ Email pending confirmation'}
            </p>
          </div>
        </div>

        {/* Last Sign In */}
        <div className="group relative bg-zinc-900/80 border border-zinc-800 rounded-2xl p-7 overflow-hidden hover:border-zinc-700 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-zinc-500 text-sm">Last Sign In</span>
            </div>
            <p className="text-2xl font-bold text-white">{lastSignIn}</p>
          </div>
        </div>

        {/* Auth Provider */}
        <div className="group relative bg-zinc-900/80 border border-zinc-800 rounded-2xl p-7 overflow-hidden hover:border-zinc-700 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-purple-400" />
              <span className="text-zinc-500 text-sm">Auth Provider</span>
            </div>
            <p className="text-2xl font-bold text-white capitalize">
              {user.app_metadata?.provider || 'Email'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Quick Actions (3 cols) */}
        <div className="lg:col-span-3 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-7">
          <h2 className="text-lg font-semibold text-white mb-5">Quick Actions</h2>
          <div className="space-y-2.5">
            {[
              { icon: Settings, label: 'Update Profile', desc: 'Edit your personal information' },
              { icon: Lock, label: 'Change Password', desc: 'Update your security credentials' },
              { icon: Bell, label: 'Notification Settings', desc: 'Manage email and push alerts' },
            ].map(({ icon: Icon, label, desc }) => (
              <button
                key={label}
                className="w-full py-4 px-5 bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700
                           transition-all duration-200 rounded-xl text-left flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 flex items-center justify-center transition-colors shrink-0">
                  <Icon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm">{label}</p>
                  <p className="text-zinc-600 text-xs">{desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 transition-colors shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Account Info (2 cols) */}
        <div className="lg:col-span-2 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-7">
          <h2 className="text-lg font-semibold text-white mb-5">Account Details</h2>
          <div className="space-y-0.5">
            {[
              { label: 'Full Name', value: `${firstName} ${lastName}`.trim() },
              { label: 'Email', value: user.email || '—' },
              { label: 'Provider', value: (user.app_metadata?.provider || 'email').charAt(0).toUpperCase() + (user.app_metadata?.provider || 'email').slice(1) },
              {
                label: 'Created',
                value: new Date(user.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
              },
              {
                label: 'User ID',
                value: user.id.split('-')[0] + '...',
                mono: true,
              },
            ].map(({ label, value, mono }, i, arr) => (
              <div
                key={label}
                className={`flex justify-between items-center py-3.5 ${
                  i < arr.length - 1 ? 'border-b border-zinc-800/60' : ''
                }`}
              >
                <span className="text-zinc-500 text-sm">{label}</span>
                <span className={`text-sm ${mono ? 'font-mono text-zinc-500 text-xs' : 'text-white'}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}