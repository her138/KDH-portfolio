
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function AdminMessages() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState('');

  async function loadMessages() {
    setLoading(true);
    setError('');

    const { data, error: dbError } = await supabase
      .from('contact_messages')
      .select(
        'id, name, email, subject, message, is_read, created_at'
      )
      .order('created_at', { ascending: false });

    if (dbError) {
      setError(dbError.message);
    } else {
      setMessages(data ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function toggleRead(message) {
    setBusyId(message.id);
    setError('');

    const { data, error: dbError } = await supabase
      .from('contact_messages')
      .update({ is_read: !message.is_read })
      .eq('id', message.id)
      .select('id');

    if (dbError || !data?.length) {
      setError(
        dbError?.message || 'Unable to update this message.'
      );
    } else {
      setMessages((previous) =>
        previous.map((item) =>
          item.id === message.id
            ? { ...item, is_read: !message.is_read }
            : item
        )
      );
    }

    setBusyId(null);
  }

  async function deleteMessage(message) {
    const confirmed = window.confirm(
      `Permanently delete the message from ${message.name}?`
    );

    if (!confirmed) return;

    setBusyId(message.id);
    setError('');

    const { data, error: dbError } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', message.id)
      .select('id');

    if (dbError || !data?.length) {
      setError(
        dbError?.message || 'Unable to delete this message.'
      );
    } else {
      setMessages((previous) =>
        previous.filter((item) => item.id !== message.id)
      );
    }

    setBusyId(null);
  }

  const unreadCount = messages.filter(
    (message) => !message.is_read
  ).length;

  return (
    <main className="container-custom py-12 space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold">
            Contact Messages
          </h1>

          <p className="text-gray-500 mt-2">
            {messages.length} total messages • {unreadCount} unread
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/admin')}
            className="border rounded-lg px-4 py-2"
          >
            Back to Dashboard
          </button>

          <button
            onClick={loadMessages}
            disabled={loading}
            className="bg-[#252422] text-white rounded-lg px-4 py-2"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-red-500">
          {error}
        </p>
      )}

      {loading && <p>Loading messages...</p>}

      {!loading && messages.length === 0 && !error && (
        <div className="glass-card p-8 text-center">
          <h2 className="text-xl font-semibold">
            No messages yet
          </h2>
          <p className="text-gray-500 mt-2">
            Messages will appear here once the contact form
            is connected securely to Supabase.
          </p>
        </div>
      )}

      {!loading && (
        <div className="space-y-5">
          {messages.map((item) => (
            <article
              key={item.id}
              className="glass-card p-6 space-y-4"
            >
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-sm text-gray-500 break-all">
                    {item.email}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleString()
                      : 'Date unavailable'}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm h-fit ${
                    item.is_read
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {item.is_read ? 'Read' : 'Unread'}
                </span>
              </div>

              <div>
                <h3 className="font-semibold">
                  {item.subject || 'No subject'}
                </h3>

                <p className="mt-3 whitespace-pre-wrap break-words">
                  {item.message}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-3">
                <button
                  disabled={busyId === item.id}
                  onClick={() => toggleRead(item)}
                  className="border rounded-lg px-4 py-2 disabled:opacity-50"
                >
                  Mark as {item.is_read ? 'Unread' : 'Read'}
                </button>

                <button
                  disabled={busyId === item.id}
                  onClick={() => deleteMessage(item)}
                  className="border border-red-500 text-red-500 rounded-lg px-4 py-2 disabled:opacity-50"
                >
                  Delete Message
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
